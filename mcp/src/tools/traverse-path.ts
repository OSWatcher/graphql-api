import { GraphqlSdk } from "../graphql/client.js";
import { resolveCommitRef } from "./resolve-ref.js";

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
