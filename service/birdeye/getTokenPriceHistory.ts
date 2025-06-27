import { queryBirdeye } from "./base"
import { ChainType } from "@/app/_contexts/chain-context"
import { TokenOverview } from "./types/token-overview"

export interface PriceHistoryItem {
  unixTime: number
  value: number
}

export const getTokenPriceHistory = async (
  address: string,
  numDays: number = 1,
  chain: ChainType = "solana"
): Promise<PriceHistoryItem[]> => {
  const now = Math.floor(Date.now() / 1000)

  if (chain === "bsc" || chain === "base") {
    try {
      const overview = await queryBirdeye<TokenOverview>(
        "defi/token_overview",
        { address },
        chain
      )

      const historyPoints: PriceHistoryItem[] = []

      historyPoints.push({ unixTime: now, value: overview.price })

      if (overview.history30mPrice)
        historyPoints.push({ unixTime: now - 30 * 60, value: overview.history30mPrice })

      if (overview.history1hPrice)
        historyPoints.push({ unixTime: now - 60 * 60, value: overview.history1hPrice })

      if (overview.history2hPrice)
        historyPoints.push({ unixTime: now - 2 * 60 * 60, value: overview.history2hPrice })

      if (overview.history4hPrice)
        historyPoints.push({ unixTime: now - 4 * 60 * 60, value: overview.history4hPrice })

      if (overview.history8hPrice)
        historyPoints.push({ unixTime: now - 8 * 60 * 60, value: overview.history8hPrice })

      if (overview.history24hPrice)
        historyPoints.push({ unixTime: now - 24 * 60 * 60, value: overview.history24hPrice })

      return historyPoints.sort((a, b) => a.unixTime - b.unixTime)
    } catch (error) {
      console.error(
        `Error fetching ${chain.toUpperCase()} token overview for price history:`,
        error
      )
      return []
    }
  }

  const startTime = now - numDays * 86400

  return queryBirdeye<PriceHistoryItem[]>(
    "defi/price_history",
    {
      address,
      type: "time",
      time_from: startTime.toString(),
      time_to: now.toString()
    },
    chain
  )
}
