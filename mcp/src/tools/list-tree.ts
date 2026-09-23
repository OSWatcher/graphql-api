import { z } from "zod";
import { GraphqlSdk } from "../graphql/client.js";
import { resolveTreeHash } from "../resolve.js";
import {
    advanceCursor,
    compositeHasMore,
    decodeCursor,
    encodeCursor,
} from "../pagination.js";
import { defineTool } from "../types.js";

export interface Entry {
    name: string;
    hash: string;
}

export interface ListTreeResult {
    directories: Entry[];
    files: Entry[];
    has_more: boolean;
    next_cursor: string | null;
}

const KEYS = ["trees", "blobs"];
const DEFAULT_LIMIT = 100;

export async function listTree(
    sdk: GraphqlSdk,
    ref: string,
    path: string,
    limit?: number,
    cursor?: string,
): Promise<ListTreeResult> {
    const treeHash = await resolveTreeHash(sdk, ref, path);
    const state = decodeCursor(cursor, KEYS);

    // A connection that is already exhausted is simply not requested.
    const includeTrees = state.trees !== null;
    const includeBlobs = state.blobs !== null;

    const result = await sdk.ListTree({
        treeHash,
        first: limit ?? DEFAULT_LIMIT,
        afterTrees: state.trees || undefined,
        afterBlobs: state.blobs || undefined,
        includeTrees,
        includeBlobs,
    });

    const tree = result.trees[0];
    if (!tree) {
        throw new Error(
            `${path} is not a directory in "${ref}" (or it holds no entries)`,
        );
    }

    const trees = tree.child_treesConnection;
    const blobs = tree.child_blobsConnection;

    const next = advanceCursor(state, {
        trees: trees?.pageInfo,
        blobs: blobs?.pageInfo,
    });
    const has_more = compositeHasMore(next);

    return {
        directories: (trees?.edges ?? []).map((e) => ({
            name: e.properties.name,
            hash: e.node.hash,
        })),
        files: (blobs?.edges ?? []).map((e) => ({
            name: e.properties.name,
            hash: e.node.hash,
        })),
        has_more,
        next_cursor: has_more ? encodeCursor(next) : null,
    };
}

export default defineTool({
    name: "list_tree",
    description: `List the contents of a directory in an OS snapshot: subdirectories and files, with their node hashes.

Example: list_tree(ref="windows_11_24h2", path="/Windows/System32/drivers")

\`limit\` applies per category, so a limit of 100 can return up to 100 directories and 100 files. Pass \`next_cursor\` back as \`cursor\` unchanged to get the next page; it encodes the position of both lists at once.

The returned hashes are what \`diff_nodes\` takes if you need a raw diff at this level.`,
    schema: {
        ref: z
            .string()
            .min(1)
            .describe("Branch name or 40-character commit hash"),
        path: z
            .string()
            .startsWith("/")
            .describe("Absolute directory path, e.g. '/Windows/System32'"),
        limit: z
            .number()
            .int()
            .positive()
            .max(500)
            .optional()
            .describe("Entries per category per page (default: 100)"),
        cursor: z
            .string()
            .optional()
            .describe(
                "next_cursor from the previous page, passed back unchanged",
            ),
    },
    handler: (sdk, { ref, path, limit, cursor }) =>
        listTree(sdk, ref, path, limit, cursor),
});
