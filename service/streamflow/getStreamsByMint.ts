import { SolanaStreamClient } from "@streamflow/stream/solana";

export const getStreamsByMint = async (mint: string) => {
    const client = new SolanaStreamClient(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!);
    const stream = await client.searchStreams({
        mint: mint,
    })
    return stream;
}
