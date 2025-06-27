import { DexScreenerResponse, DexScreenerPair } from "./types";

export const fetchSolanaPairs = async (tokenAddress: string): Promise<DexScreenerPair[]> => {
  try {
    const endpoint = `https://api.dexscreener.com/latest/dex/tokens/${tokenAddress}`;
    const res = await fetch(endpoint);
    const result: DexScreenerResponse = await res.json();

    if (!Array.isArray(result.pairs) || result.pairs.length === 0) return [];

    const filtered = result.pairs
      .filter(pair => pair.chainId === "solana")
      .sort((a, b) => (b.liquidity?.usd || 0) - (a.liquidity?.usd || 0));

    return filtered;
  } catch (err) {
    console.error("Failed to fetch token pairs:", err);
    return [];
  }
};
