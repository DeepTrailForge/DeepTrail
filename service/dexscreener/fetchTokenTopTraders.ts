import { queryBirdeye } from "./base";
import { ChainType } from "@/app/_contexts/chain-context";
import type { TopTradersByTokenResponse } from "./types";

type TimeUnit = 24 | 48 | 72;

interface FetchTopTradersOptions {
    tokenAddress: string;
    timeframeInHours?: TimeUnit;
    direction?: "asc" | "desc";
    sortBy?: "volume" | "count";
    startFrom?: number;
    maxResults?: number;
    network?: ChainType;
}

export const fetchTokenTopTraders = async ({
    tokenAddress,
    timeframeInHours = 24,
    direction = "desc",
    sortBy = "volume",
    startFrom = 0,
    maxResults = 10,
    network = "solana"
}: FetchTopTradersOptions): Promise<TopTradersByTokenResponse> => {
    try {
        const response = await queryBirdeye<TopTradersByTokenResponse>(
            "defi/v2/tokens/top_traders",
            {
                address: tokenAddress,
                time_frame: timeframeInHours,
                sort_type: direction,
                sort_by: sortBy,
                offset: startFrom,
                limit: maxResults
            },
            network
        );
        return response;
    } catch (error) {
        console.error("Error fetching token top traders:", error);
        throw error;
    }
};