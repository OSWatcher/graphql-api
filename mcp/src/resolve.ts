import type { GraphqlSdk } from "./graphql/client.js";

export interface ResolvedCommitRef {
    commitHash: string;
    filesystemHash: string;
}

/**
 * Resolve a branch name or 40-character commit hash to its commit hash and
 * filesystem root hash. One GraphQL round trip: the query asks for both a
 * branch and a commit match and takes whichever answers.
 */
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

/**
 * Resolve (ref, absolute path) to the hash of the node at that path, or null.
 * traversePath returns a bare hash with no label, so the caller decides what it
 * expected to find; resolveTreeHash and resolveBlobHash only differ in wording.
 */
export async function resolveNodeHash(
    sdk: GraphqlSdk,
    ref: string,
    path: string,
): Promise<string | null> {
    const { filesystemHash } = await resolveCommitRef(sdk, ref);
    const result = await sdk.TraversePath({
        parentLabel: "Tree",
        treeHash: filesystemHash,
        path,
    });
    return result.traversePath ?? null;
}

export async function resolveTreeHash(
    sdk: GraphqlSdk,
    ref: string,
    path: string,
): Promise<string> {
    const hash = await resolveNodeHash(sdk, ref, path);
    if (!hash) {
        throw new Error(`Directory not found in "${ref}": ${path}`);
    }
    return hash;
}

export async function resolveBlobHash(
    sdk: GraphqlSdk,
    ref: string,
    path: string,
): Promise<string> {
    const hash = await resolveNodeHash(sdk, ref, path);
    if (!hash) {
        throw new Error(`File not found in "${ref}": ${path}`);
    }
    return hash;
}

export type Hive = "SAM" | "SECURITY" | "SOFTWARE" | "SYSTEM" | "DEFAULT";

/**
 * An LLM knows `HKLM\SOFTWARE`; requiring it to know the on-disk hive location
 * is a memorisation tax. The tools take the hive name and map it here.
 */
export const HIVE_PATHS: Record<Hive, string> = {
    SAM: "/Windows/System32/config/SAM",
    SECURITY: "/Windows/System32/config/SECURITY",
    SOFTWARE: "/Windows/System32/config/SOFTWARE",
    SYSTEM: "/Windows/System32/config/SYSTEM",
    DEFAULT: "/Windows/System32/config/DEFAULT",
};

/** Resolve a hive to its WinRegKey root hash: traversePath then HAS_WINREG. */
export async function resolveHiveRoot(
    sdk: GraphqlSdk,
    ref: string,
    hive: Hive,
): Promise<string> {
    const path = HIVE_PATHS[hive];
    const blobHash = await resolveNodeHash(sdk, ref, path);
    if (!blobHash) {
        throw new Error(
            `Hive ${hive} not found in "${ref}" (expected at ${path})`,
        );
    }

    const result = await sdk.GetBlobWinRegRoot({ hash: blobHash });
    const winregHash = result.blobs[0]?.has_winreg?.hash;
    if (!winregHash) {
        throw new Error(`Hive ${hive} in "${ref}" has no parsed registry data`);
    }
    return winregHash;
}
