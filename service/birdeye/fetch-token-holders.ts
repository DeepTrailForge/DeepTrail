import { queryBirdeye } from "./base"
import { ChainType } from "@/app/_contexts/chain-context"

import type { TokenHoldersResponse } from "./types"

type HolderQueryParams = {
  address: string
  offset?: number
  limit?: number
  chain?: ChainType
}

export async function fetchTokenHolders({
  address,
  offset = 0,
  limit = 20,
  chain = "solana"
}: HolderQueryParams): Promise<TokenHoldersResponse> {
  console.info(\`[Birdeye] Getting holders for token: \${address} | Chain: \${chain} | Limit: \${limit}\`)

  return queryBirdeye<TokenHoldersResponse>(
    "defi/v3/token/holder",
    { address, offset, limit },
    chain
  )
}