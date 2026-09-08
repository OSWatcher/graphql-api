import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { GraphqlSdk } from "./graphql/client.js";
import { listBranches } from "./tools/branches.js";
import { listCommits } from "./tools/commits.js";
import { diffVersions } from "./tools/diff.js";
import { search } from "./tools/search.js";
import { searchNext } from "./tools/search-next.js";
import { searchClose } from "./tools/search-close.js";
import { traversePath } from "./tools/traverse-path.js";
import { getWinregRoot } from "./tools/winreg-root.js";
import { getBlobsWithSymbols } from "./tools/blobs-with-symbols.js";
import { diffNodes } from "./tools/diff-nodes.js";

export function createServer(sdk: GraphqlSdk): McpServer {
    const server = new McpServer({
        name: "oswatcher",
        version: "1.0.0",
    });

    server.tool(
        "list_branches",
        "List available OS branches (operating system versions tracked by OSWatcher)",
        {
            search: z
                .string()
                .optional()
                .describe("Case-insensitive substring filter on branch name"),
        },
        async ({ search }) => {
            try {
                const branches = await listBranches(sdk, search);
                return {
                    content: [
                        {
                            type: "text" as const,
                            text: JSON.stringify(branches, null, 2),
                        },
                    ],
                };
            } catch (error) {
                return {
                    content: [
                        {
                            type: "text" as const,
                            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
                        },
                    ],
                    isError: true,
                };
            }
        },
    );

    server.tool(
        "list_commits",
        "List commits (OS snapshots/updates) on a branch",
        {
            branch: z.string().describe("Branch name (e.g. 'windows_11_23h2')"),
            limit: z
                .number()
                .int()
                .positive()
                .optional()
                .describe("Maximum number of commits to return"),
        },
        async ({ branch, limit }) => {
            try {
                const commits = await listCommits(sdk, branch, limit);
                return {
                    content: [
                        {
                            type: "text" as const,
                            text: JSON.stringify(commits, null, 2),
                        },
                    ],
                };
            } catch (error) {
                return {
                    content: [
                        {
                            type: "text" as const,
                            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
                        },
                    ],
                    isError: true,
                };
            }
        },
    );

    server.tool(
        "diff_versions",
        "Compute a filesystem diff between two commits or branches at a specific path",
        {
            base_ref: z
                .string()
                .min(1)
                .describe(
                    "Older side of the comparison: commit hash or branch name",
                ),
            diffee_ref: z
                .string()
                .min(1)
                .describe(
                    "Newer side of the comparison: commit hash or branch name",
                ),
            path: z
                .string()
                .startsWith("/")
                .describe(
                    "Absolute filesystem path to diff, e.g. '/' or '/Windows/System32'",
                ),
            max_depth: z
                .number()
                .int()
                .min(0)
                .max(100)
                .optional()
                .describe(
                    "Depth of child traversal. If omitted, GraphQL applies its own default and auth rules.",
                ),
            limit: z
                .number()
                .int()
                .positive()
                .max(10000)
                .optional()
                .describe("Maximum number of diff items to return"),
            offset: z
                .number()
                .int()
                .nonnegative()
                .optional()
                .describe(
                    "Number of diff items to skip before returning results",
                ),
            status_filter: z
                .array(z.enum(["NEW", "MOD", "DEL", "UNCHANGED"]))
                .optional()
                .describe("Optional diff statuses to include"),
            with_intermediates: z
                .boolean()
                .optional()
                .describe(
                    "Include intermediary directory nodes in recursive diffs",
                ),
        },
        async (params) => {
            try {
                const response = await diffVersions({ ...params, sdk });
                return {
                    content: [
                        {
                            type: "text" as const,
                            text: JSON.stringify(response, null, 2),
                        },
                    ],
                };
            } catch (error) {
                return {
                    content: [
                        {
                            type: "text" as const,
                            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
                        },
                    ],
                    isError: true,
                };
            }
        },
    );

    server.tool(
        "search",
        "Search for files, registry keys, symbols, or structs across OS versions by substring match. `start_ref` accepts either a branch name or a 40-character commit hash. If the value is not a 40-character hash, it is treated as a branch name. To search a single snapshot, resolve and pass the exact commit hash (optionally set `end_ref` to the same hash). `entity_types` must use uppercase enum values: `FILESYSTEM`, `REGISTRY`, `STRUCT`, `SYMBOL`. Returns paginated results with a session_id. Use search_next to fetch more results, search_close to end the session.",
        {
            search_term: z
                .string()
                .min(1)
                .max(500)
                .describe(
                    "Substring to search for (e.g. 'ntdll.dll', 'Defender', '_EPROCESS')",
                ),
            start_ref: z
                .string()
                .describe(
                    "Starting point for commit traversal: either a branch name or an exact 40-character commit hash. Non-hash values are treated as branch names.",
                ),
            direction: z
                .enum(["BACKWARD", "FORWARD"])
                .optional()
                .describe(
                    "Commit traversal direction from start_ref (default: BACKWARD). This controls history traversal, not single-snapshot selection.",
                ),
            include_updates: z
                .boolean()
                .optional()
                .describe(
                    "Whether to traverse update or patch branches in commit history. `false` does not mean single-commit search; it only keeps traversal directed.",
                ),
            branch: z
                .string()
                .optional()
                .describe(
                    "Optional branch filter to constrain traversal to commits reachable from a specific tracked branch.",
                ),
            end_ref: z
                .string()
                .optional()
                .describe(
                    "Optional commit hash to bound the search range. For a single-snapshot search, use the same 40-character commit hash for both start_ref and end_ref.",
                ),
            entity_types: z
                .array(z.enum(["FILESYSTEM", "REGISTRY", "STRUCT", "SYMBOL"]))
                .optional()
                .describe(
                    "Entity types to search (default: all types). Must use uppercase enum values: FILESYSTEM, REGISTRY, STRUCT, SYMBOL.",
                ),
            case_sensitive: z
                .boolean()
                .optional()
                .describe("Case-sensitive matching (default: false)"),
            limit: z
                .number()
                .int()
                .positive()
                .optional()
                .describe(
                    "Max results per page (default: 50). Use search_next with the returned session_id to get more results.",
                ),
        },
        async (params) => {
            try {
                const response = await search({ ...params, sdk });
                return {
                    content: [
                        {
                            type: "text" as const,
                            text: JSON.stringify(response, null, 2),
                        },
                    ],
                };
            } catch (error) {
                return {
                    content: [
                        {
                            type: "text" as const,
                            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
                        },
                    ],
                    isError: true,
                };
            }
        },
    );

    server.tool(
        "search_next",
        "Fetch the next page of results from a paginated search session. Returns the same format as search. When has_more is false, the session is automatically closed.",
        {
            session_id: z
                .string()
                .describe("Session ID returned by a previous search call"),
        },
        async ({ session_id }) => {
            try {
                const response = await searchNext(sdk, session_id);
                return {
                    content: [
                        {
                            type: "text" as const,
                            text: JSON.stringify(response, null, 2),
                        },
                    ],
                };
            } catch (error) {
                return {
                    content: [
                        {
                            type: "text" as const,
                            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
                        },
                    ],
                    isError: true,
                };
            }
        },
    );

    server.tool(
        "search_close",
        "Close a search session to free server resources. Sessions auto-expire after 5 minutes of inactivity, so this is optional but recommended when done searching.",
        {
            session_id: z.string().describe("Session ID to close"),
        },
        async ({ session_id }) => {
            try {
                const closed = await searchClose(sdk, session_id);
                return {
                    content: [
                        {
                            type: "text" as const,
                            text: closed
                                ? "Session closed successfully."
                                : "Session not found (may have already expired).",
                        },
                    ],
                };
            } catch (error) {
                return {
                    content: [
                        {
                            type: "text" as const,
                            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
                        },
                    ],
                    isError: true,
                };
            }
        },
    );

    server.tool(
        "traverse_path",
        `Walk the filesystem hierarchy of a commit to an absolute path and return its node hash.

Returns the hash of the node (Tree or Blob) located at the given path within the commit's filesystem.
Returns null if the path does not exist.

Use this to locate specific files or directories before calling diff_nodes or get_winreg_root.`,
        {
            ref: z.string().min(1).describe("Branch name or commit hash"),
            path: z
                .string()
                .startsWith("/")
                .describe(
                    "Absolute filesystem path to locate, e.g. '/Windows/System32/config/SAM'",
                ),
        },
        async ({ ref, path }) => {
            try {
                const result = await traversePath(sdk, ref, path);
                return {
                    content: [
                        {
                            type: "text" as const,
                            text: JSON.stringify(result, null, 2),
                        },
                    ],
                };
            } catch (error) {
                return {
                    content: [
                        {
                            type: "text" as const,
                            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
                        },
                    ],
                    isError: true,
                };
            }
        },
    );

    server.tool(
        "get_winreg_root",
        `Resolve a Blob hash to its Windows registry root (WinRegKey) hash by following the HAS_WINREG relationship.

Use this after traverse_path to get the registry root hash needed for diff_nodes registry diffs.

Known Windows registry hive locations:
  HKEY_LOCAL_MACHINE/SAM      → /Windows/System32/config/SAM
  HKEY_LOCAL_MACHINE/SECURITY → /Windows/System32/config/SECURITY
  HKEY_LOCAL_MACHINE/SOFTWARE → /Windows/System32/config/SOFTWARE
  HKEY_LOCAL_MACHINE/SYSTEM   → /Windows/System32/config/SYSTEM
  HKEY_USERS/.DEFAULT         → /Windows/System32/config/DEFAULT

Registry diff procedure:
  1. traverse_path(base_ref, "/Windows/System32/config/SOFTWARE") → hash_A
  2. get_winreg_root(hash_A) → winreg_hash_A
  3. traverse_path(diffee_ref, "/Windows/System32/config/SOFTWARE") → hash_B
  4. get_winreg_root(hash_B) → winreg_hash_B
  5. diff_nodes(winreg_hash_A, winreg_hash_B, parent_label="WinRegKey", filter=["WinRegKey","WinRegValue"])`,
        {
            blob_hash: z
                .string()
                .min(1)
                .describe("Blob node hash (from traverse_path)"),
        },
        async ({ blob_hash }) => {
            try {
                const result = await getWinregRoot(sdk, blob_hash);
                return {
                    content: [
                        {
                            type: "text" as const,
                            text: JSON.stringify(result, null, 2),
                        },
                    ],
                };
            } catch (error) {
                return {
                    content: [
                        {
                            type: "text" as const,
                            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
                        },
                    ],
                    isError: true,
                };
            }
        },
    );

    server.tool(
        "get_blobs_with_symbols",
        `Return all PE Blob files in a commit that have associated PDB symbols or struct data.

Use this tool to discover blob hashes before calling diff_nodes for symbol or struct diffs.

Symbols diff procedure:
  1. get_blobs_with_symbols(base_ref) → find blob matching target PE by blob_path suffix → blob_hash_A
  2. get_blobs_with_symbols(diffee_ref) → blob_hash_B
  3. diff_nodes(blob_hash_A, blob_hash_B, parent_label="Blob", filter=["Symbol"], max_depth=1)

Structs list diff procedure:
  Same as symbols but filter=["Struct"] and max_depth=1 (required)

Struct fields diff for a specific struct (e.g. _EPROCESS):
  Same blob resolution, then:
  diff_nodes(..., parent_label="Blob", filter=["StructField"], at_path="/_EPROCESS", max_depth=1)
  Add status_filter=["NEW","MOD","DEL","UNCHANGED"] to reconstruct the full C type layout.`,
        {
            ref: z.string().min(1).describe("Branch name or commit hash"),
        },
        async ({ ref }) => {
            try {
                const result = await getBlobsWithSymbols(sdk, ref);
                return {
                    content: [
                        {
                            type: "text" as const,
                            text: JSON.stringify(result, null, 2),
                        },
                    ],
                };
            } catch (error) {
                return {
                    content: [
                        {
                            type: "text" as const,
                            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
                        },
                    ],
                    isError: true,
                };
            }
        },
    );

    server.tool(
        "diff_nodes",
        `Lower-level diff operating on raw node hashes — any entity type (filesystem Tree/Blob, registry WinRegKey, symbols, structs).

Unlike diff_versions (which resolves refs and is filesystem-only), this tool accepts raw node hashes and an explicit parent_label + filter.

parent_label and filter combinations:
  Entity        | parent_label  | filter                          | max_depth
  --------------|---------------|---------------------------------|----------
  Filesystem    | Tree          | ["Tree", "Blob"]                | (omit)
  Registry      | WinRegKey     | ["WinRegKey", "WinRegValue"]    | (omit)
  Symbols       | Blob          | ["Symbol"]                      | 1 (required)
  Structs list  | Blob          | ["Struct"]                      | 1 (required)
  Struct fields | Blob          | ["StructField"]                 | 1 (required)

IMPORTANT: Always pass an explicit filter — an empty filter silently drops leaf nodes.

IMPORTANT: max_depth=1 is required for Symbol, Struct, and StructField diffs. Without it
the procedure recurses into children looking for the same label type and returns nothing
(Symbol/Struct/StructField nodes have no children of the same label).

For struct field diffs scoped to a specific struct, pass at_path with the struct name:
  at_path="/_EPROCESS"  (note the leading slash)

Struct field status_filter guidance:
- Omit status_filter (or use ["NEW","MOD","DEL"]) for delta-only — what changed
- Pass status_filter=["NEW","MOD","DEL","UNCHANGED"] to reconstruct the full C type layout`,
        {
            base_node_hash: z
                .string()
                .min(1)
                .describe(
                    "Base side node hash (from traverse_path or get_blobs_with_symbols)",
                ),
            diffee_node_hash: z
                .string()
                .min(1)
                .describe(
                    "Diffee side node hash (from traverse_path or get_blobs_with_symbols)",
                ),
            parent_label: z
                .string()
                .min(1)
                .describe(
                    "Node label of the root: 'Tree', 'WinRegKey', or 'Blob'",
                ),
            filter: z
                .array(z.string())
                .min(1)
                .describe(
                    "Node labels to include in results — must not be empty",
                ),
            at_path: z
                .string()
                .optional()
                .describe(
                    "Scope diff to a sub-path (default: '/'). For struct fields use e.g. '/_EPROCESS'",
                ),
            max_depth: z
                .number()
                .int()
                .min(0)
                .max(100)
                .optional()
                .describe("Depth of child traversal"),
            limit: z
                .number()
                .int()
                .positive()
                .max(10000)
                .optional()
                .describe("Maximum number of diff items to return"),
            offset: z
                .number()
                .int()
                .nonnegative()
                .optional()
                .describe("Number of diff items to skip"),
            status_filter: z
                .array(z.enum(["NEW", "MOD", "DEL", "UNCHANGED"]))
                .optional()
                .describe("Optional diff statuses to include"),
            with_intermediates: z
                .boolean()
                .optional()
                .describe(
                    "Include intermediary directory nodes in recursive diffs",
                ),
        },
        async (params) => {
            try {
                const result = await diffNodes({ ...params, sdk });
                return {
                    content: [
                        {
                            type: "text" as const,
                            text: JSON.stringify(result, null, 2),
                        },
                    ],
                };
            } catch (error) {
                return {
                    content: [
                        {
                            type: "text" as const,
                            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
                        },
                    ],
                    isError: true,
                };
            }
        },
    );

    return server;
}
