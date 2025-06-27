import { chunkArray } from "@/lib/utils"
import { queryBirdeye } from "./base"
import { ChainType } from "@/app/_contexts/chain-context"
import { getAllBalances } from "@/services/moralis/get-all-balances"
import { getPrices } from "./get-prices"
import { getToken } from "@/db/services"
import { getTokenMetadata } from "./get-token-metadata"

import type { PortfolioResponse, Portfolio, PortfolioItem } from "./types"

const normalizeAddress = (addr: string) =>
  addr === "So11111111111111111111111111111111111111111"
    ? "So11111111111111111111111111111111111111112"
    : addr

export async function buildUserPortfolio(
  wallet: string,
  chain: ChainType = "solana"
): Promise<Portfolio> {
  const tokens: PortfolioItem[] = []

  try {
    if (chain === "bsc" || chain === "base") {
      const data = await getAllBalances(wallet, chain)

      return {
        wallet,
        totalUsd: data.result.reduce((sum, t) => sum + (t.usd_value || 0), 0),
        items: data.result.map((t) => ({
          address: t.token_address,
          decimals: t.decimals,
          balance: parseFloat(t.balance),
          uiAmount: parseFloat(t.balance_formatted),
          chainId: chain === "bsc" ? "0x38" : "0x2105",
          name: t.name,
          symbol: t.symbol.toUpperCase(),
          logoURI: t.logo || "",
          priceUsd: t.usd_price,
          valueUsd: t.usd_value,
        })),
      }
    }

    const { items: solanaTokens } = await queryBirdeye<PortfolioResponse>(
      "v1/wallet/token_list",
      { wallet },
      chain
    )

    const filtered = solanaTokens.filter(
      (t) => t.address.toLowerCase() !== "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
    )

    const prices = (await Promise.all(
      chunkArray(filtered.map((t) => normalizeAddress(t.address)), 100).map((group) =>
        getPrices(group, chain)
      )
    )).reduce((acc, batch) => ({ ...acc, ...batch }), {})

    const enriched = await Promise.all(
      solanaTokens.map(async (t) => {
        const address = normalizeAddress(t.address)
        const price = prices[address]?.value ?? 0
        const value = t.uiAmount * price

        const meta = await getToken(address)
        if (meta) {
          return {
            ...t,
            priceUsd: price,
            valueUsd: value,
            name: meta.name,
            symbol: meta.symbol.toUpperCase(),
            logoURI: meta.logoURI,
          }
        }

        try {
          const fallback = await getTokenMetadata(address, chain)
          return {
            ...t,
            priceUsd: price,
            valueUsd: value,
            name: fallback.name,
            symbol: fallback.symbol.toUpperCase(),
            logoURI: fallback.logo_uri,
          }
        } catch (err) {
          console.warn(`Failed to enrich token ${address}:`, err)
          return null
        }
      })
    )

    const valid = enriched.filter(
      (x): x is PortfolioItem => x !== null && x.priceUsd > 0 && x.valueUsd > 0
    )

    const sorted = valid.sort((a, b) => b.valueUsd - a.valueUsd)

    return {
      wallet,
      totalUsd: sorted.reduce((sum, t) => sum + t.valueUsd, 0),
      items: sorted,
    }
  } catch (err) {
    console.error("Portfolio fetch failed:", err)
    throw err
  }
}