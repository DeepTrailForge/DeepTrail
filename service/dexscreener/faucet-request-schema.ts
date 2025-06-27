import { z } from "zod"

export const FaucetRequestSchema = z
  .object({
    assetId: z.string().optional().describe("Optional ID of the asset to receive from the faucet"),
  })
  .strip()
  .describe("Schema for initiating a test token faucet request")