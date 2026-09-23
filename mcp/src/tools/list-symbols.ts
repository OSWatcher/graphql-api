import { z } from "zod";
import { GraphqlSdk } from "../graphql/client.js";
import { resolveBlobHash } from "../resolve.js";
import { Page, singlePage } from "../pagination.js";
import { defineTool } from "../types.js";

export interface SymbolItem {
    name: string;
    hash: string;
    address: string;
}

const DEFAULT_LIMIT = 50;

export async function listSymbols(
    sdk: GraphqlSdk,
    ref: string,
    blob_path: string,
    name?: string,
    limit?: number,
    cursor?: string,
): Promise<Page<SymbolItem> & { total_count: number }> {
    const blobHash = await resolveBlobHash(sdk, ref, blob_path);
    const first = limit ?? DEFAULT_LIMIT;

    const result = name
        ? await sdk.ListSymbolsByName({
              blobHash,
              symbolName: name,
              first,
              after: cursor,
          })
        : await sdk.ListSymbols({ blobHash, first, after: cursor });

    const connection = result.blobs[0]?.has_symbolConnection;
    if (!connection) {
        throw new Error(`${blob_path} has no PDB symbol or struct data`);
    }

    const items = connection.edges.map((e) => ({
        name: e.properties.name,
        hash: e.node.hash,
        address: e.node.address,
    }));

    return {
        ...singlePage(items, connection.pageInfo),
        total_count: connection.totalCount,
    };
}

export default defineTool({
    name: "list_symbols",
    description: `List the PDB symbols exported by a PE file, with their addresses.

Pass \`name\` for an exact-match lookup: list_symbols(ref="windows_11_24h2", blob_path="/Windows/System32/ntdll.dll", name="NtCreateFile") answers "what is the address of NtCreateFile".

Without \`name\` this pages the whole symbol table, which is large; ntdll.dll alone has thousands. \`total_count\` reports the full size. Pass \`next_cursor\` back as \`cursor\` for the next page.`,
    schema: {
        ref: z
            .string()
            .min(1)
            .describe("Branch name or 40-character commit hash"),
        blob_path: z
            .string()
            .startsWith("/")
            .describe(
                "Absolute path to the PE file, e.g. '/Windows/System32/ntdll.dll'",
            ),
        name: z
            .string()
            .optional()
            .describe("Exact symbol name for a direct lookup"),
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
        listSymbols(sdk, ref, blob_path, name, limit, cursor),
});
