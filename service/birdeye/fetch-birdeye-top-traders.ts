import { queryBirdeye } from "./base"
import { ChainType } from "@/app/_contexts/chain-context"

import {
  TopTradersByTokenTimeFrame,
  TopTradersByTokenSortType,
  TopTradersByTokenSortBy,
  TopTradersByTokenResponse
} from "./types"

type TraderQueryParams = {
  address: string
  timeFrame?: TopTradersByTokenTimeFrame
  sortType?: TopTradersByTokenSortType
  sortBy?: TopTradersByTokenSortBy
  offset?: number
  limit?: number
  chain?: ChainType
}

export async function fetchBirdeyeTopTraders({
  address,
  timeFrame = TopTradersByTokenTimeFrame.TwentyFourHours,
  sortType = TopTradersByTokenSortType.Descending,
  sortBy = TopTradersByTokenSortBy.Volume,
  offset = 0,
  limit = 10,
  chain = "solana"
}: TraderQueryParams): Promise<TopTradersByTokenResponse> {
  return queryBirdeye<TopTradersByTokenResponse>(
    "defi/v2/tokens/top_traders",
    {
      address,
      time_frame: timeFrame,
      sort_type: sortType,
      sort_by: sortBy,
      offset,
      limit
    },
    chain
  )
}