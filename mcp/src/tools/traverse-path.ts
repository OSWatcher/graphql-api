import { z } from "zod";
import { resolveCommitRef } from "../resolve.js";
import { defineTool } from "../types.js";
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

export default defineTool({
    name: "traverse_path",
    description: `Walk the filesystem hierarchy of a commit to an absolute path and return its node hash.

Returns the hash of the node (Tree or Blob) located at the given path within the commit's filesystem.
Returns null if the path does not exist.

Use this to locate specific files or directories before calling diff_nodes or get_winreg_root.

Prefer get_struct / list_tree / list_registry_key / list_symbols unless you need raw hash access.`,
    schema: {
        ref: z.string().min(1).describe("Branch name or commit hash"),
        path: z
            .string()
            .startsWith("/")
            .describe(
                "Absolute filesystem path to locate, e.g. '/Windows/System32/config/SAM'",
            ),
    },
    handler: (sdk, { ref, path }) => traversePath(sdk, ref, path),
});
