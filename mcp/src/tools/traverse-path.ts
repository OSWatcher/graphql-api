import { resolveCommitRef } from "../resolve.js";
import type { GraphqlSdk } from "../graphql/client.js";

export interface TraversePathResult {
    hash: string | null;
}

export async function traversePath(
    sdk: GraphqlSdk,
    ref: string,
    path: string,
): Promise<TraversePathResult> {
    const { filesystemHash } = await resolveCommitRef(sdk, ref);

    const result = await sdk.TraversePath({
        parentLabel: "Tree",
        treeHash: filesystemHash,
        path,
    });

    return { hash: result.traversePath ?? null };
}
