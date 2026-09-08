import { GraphqlSdk } from "../graphql/client.js";

export interface ResolvedCommitRef {
    commitHash: string;
    filesystemHash: string;
}

export async function resolveCommitRef(
    sdk: GraphqlSdk,
    ref: string,
): Promise<ResolvedCommitRef> {
    const result = await sdk.ResolveCommitRef({ ref });
    const branchMatch = result.branches[0];

    if (branchMatch?.tracks?.filesystem?.hash) {
        return {
            commitHash: branchMatch.tracks.hash,
            filesystemHash: branchMatch.tracks.filesystem.hash,
        };
    }

    const commitMatch = result.commits[0];
    if (commitMatch?.filesystem?.hash) {
        return {
            commitHash: commitMatch.hash,
            filesystemHash: commitMatch.filesystem.hash,
        };
    }

    if (branchMatch && !branchMatch.tracks) {
        throw new Error(`Branch "${ref}" has no tracked commit`);
    }

    throw new Error(`Branch or commit not found: ${ref}`);
}
