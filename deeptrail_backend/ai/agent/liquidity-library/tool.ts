import { FETCH_POOL_DATA_KEY } from "@/ai/modules/liquidity/pool-fetcher/key"
import { toolkitBuilder } from "@/ai/core"
import { FetchPoolDataAction } from "@/ai/modules/liquidity/pool-fetcher/action"

export const LIQUIDITY_ANALYSIS_TOOLS = {
  [`liquidityscan-${FETCH_POOL_DATA_KEY}`]: toolkitBuilder(new FetchPoolDataAction()),
}