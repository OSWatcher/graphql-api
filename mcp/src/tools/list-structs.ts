import { z } from "zod";
import { GraphqlSdk } from "../graphql/client.js";
import { resolveBlobHash } from "../resolve.js";
import { Page, singlePage } from "../pagination.js";
import { defineTool } from "../types.js";

export interface StructItem {
    name: string;
    hash: string;
    size: number;
    kind: string;
}

const DEFAULT_LIMIT = 50;

export async function listStructs(
    sdk: GraphqlSdk,
    ref: string,
    blob_path: string,
    name?: string,
    limit?: number,
    cursor?: string,
): Promise<Page<StructItem> & { total_count: number }> {
    const blobHash = await resolveBlobHash(sdk, ref, blob_path);
    const first = limit ?? DEFAULT_LIMIT;

    const result = name
        ? await sdk.ListStructsByName({
              blobHash,
              structName: name,
              first,
              after: cursor,
          })
        : await sdk.ListStructs({ blobHash, first, after: cursor });

    const connection = result.blobs[0]?.has_structConnection;
    if (!connection) {
        throw new Error(`${blob_path} has no PDB symbol or struct data`);
    }

    const items = connection.edges.map((e) => ({
        name: e.properties.name,
        hash: e.node.hash,
        size: e.node.size,
        kind: e.node.kind,
    }));

    return {
        ...singlePage(items, connection.pageInfo),
        total_count: connection.totalCount,
    };
}

export default defineTool({
    name: "list_structs",
    description: `List the C structs a PE file's PDB data defines, with their size and kind.

Use this to discover struct names before calling get_struct, which returns a single struct's full field layout.

Pass \`name\` for an exact-match lookup. Pass \`next_cursor\` back as \`cursor\` for the next page; \`total_count\` reports the full size of the list.`,
    schema: {
        ref: z
            .string()
            .min(1)
            .describe("Branch name or 40-character commit hash"),
        blob_path: z
            .string()
            .startsWith("/")
            .describe(
                "Absolute path to the PE file, e.g. '/Windows/System32/ntoskrnl.exe'",
            ),
        name: z
            .string()
            .optional()
            .describe("Exact struct name for a direct lookup, e.g. '_EPROCESS'"),
        limit: z
            .number()
            .int()
            .positive()
            .max(500)
            .optional()
            .describe("Results per page (default: 50)"),
        cursor: z
            .string()
            .optional()
            .describe("next_cursor from the previous page, passed back unchanged"),
    },
    handler: (sdk, { ref, blob_path, name, limit, cursor }) =>
        listStructs(sdk, ref, blob_path, name, limit, cursor),
});
