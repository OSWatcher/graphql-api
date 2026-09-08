import { GraphqlSdk } from "../graphql/client.js";
import { resolveCommitRef } from "./resolve-ref.js";

export interface BlobWithSymbols {
    blob_hash: string;
    blob_path: string;
}

export async function getBlobsWithSymbols(
    sdk: GraphqlSdk,
    ref: string,
): Promise<BlobWithSymbols[]> {
    const { commitHash } = await resolveCommitRef(sdk, ref);

    const result = await sdk.GetBlobsWithSymbols({ commitHash });

    return result.getBlobsWithSymbols.map((b) => ({
        blob_hash: b.blob_hash,
        blob_path: b.blob_path,
    }));
}
