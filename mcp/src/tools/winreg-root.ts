import { GraphqlSdk } from "../graphql/client.js";

export interface WinregRootResult {
    winreg_hash: string | null;
}

export async function getWinregRoot(
    sdk: GraphqlSdk,
    blob_hash: string,
): Promise<WinregRootResult> {
    const result = await sdk.GetBlobWinRegRoot({ hash: blob_hash });
    const blob = result.blobs[0];
    return { winreg_hash: blob?.has_winreg?.hash ?? null };
}
