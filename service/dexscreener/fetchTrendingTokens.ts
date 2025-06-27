
import { queryBirdeye } from "./base";
import { TrendingTokensResponse } from "./types/trending";
import { ChainType } from "@/app/_contexts/chain-context";

export const fetchTrendingTokensList = async (
    chain: ChainType = 'solana',
    page: number = 1,
    perPage: number = 20
): Promise<TrendingTokensResponse> => {
    const offset = (page - 1) * perPage;

    return queryBirdeye<TrendingTokensResponse>(
        'defi/token_trending',
        {
            sort_by: 'rank',
            sort_type: 'asc',
            offset,
            limit: perPage
        },
        chain
    );
}
