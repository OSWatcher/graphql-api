import { z } from "zod";
import { GraphqlSdk } from "../graphql/client.js";
import {
    CommitHistoryDirection,
    EntityType,
} from "../graphql/generated/sdk.js";
import { defineTool } from "../types.js";

export interface SearchResult {
    type: string;
    commit_name: string;
    commit_hash: string;
    blob_path: string;
    blob_hash: string;
    entity_path?: string | null;
    node_hash: string;
}

export interface SearchResponse {
    session_id: string | null;
    results: SearchResult[];
    has_more: boolean;
    total_fetched: number;
}

const DEFAULT_LIMIT = 50;

export async function search(params: {
    sdk: GraphqlSdk;
    search_term: string;
    start_ref: string;
    direction?: string;
    include_updates?: boolean;
    branch?: string;
    end_ref?: string;
    entity_types?: string[];
    case_sensitive?: boolean;
    limit?: number;
}): Promise<SearchResponse> {
    const { sdk } = params;
    const direction =
        params.direction === "FORWARD"
            ? CommitHistoryDirection.Forward
            : CommitHistoryDirection.Backward;

    const entity_types = params.entity_types?.map((t) => {
        const mapping: Record<string, EntityType> = {
            FILESYSTEM: EntityType.Filesystem,
            REGISTRY: EntityType.Registry,
            STRUCT: EntityType.Struct,
            SYMBOL: EntityType.Symbol,
        };
        if (!mapping[t]) {
            throw new Error(
                `Invalid entity type "${t}". Valid types: FILESYSTEM, REGISTRY, STRUCT, SYMBOL`,
            );
        }
        return mapping[t];
    });

    const pageSize = params.limit ?? DEFAULT_LIMIT;

    const result = await sdk.SearchWithSession({
        input: {
            commit_range: {
                startRef: params.start_ref,
                direction,
                include_updates: params.include_updates ?? false,
                branch: params.branch ?? null,
                endRef: params.end_ref ?? null,
            },
            search_term: params.search_term,
            entity_types: entity_types ?? null,
            case_sensitive: params.case_sensitive ?? false,
        },
        pageSize,
    });

    const page = result.searchWithSession;
    return {
        session_id: page.session_id ?? null,
        results: page.results.map((r) => ({
            type: r.type,
            commit_name: r.commit_name,
            commit_hash: r.commit_hash,
            blob_path: r.blob_path,
            blob_hash: r.blob_hash,
            entity_path: r.entity_path,
            node_hash: r.node_hash,
        })),
        has_more: page.has_more,
        total_fetched: page.total_fetched,
    };
}

export default defineTool({
    name: "search",
    description:
        "Search for files, registry keys, symbols, or structs across OS versions by substring match. `start_ref` accepts either a branch name or a 40-character commit hash. If the value is not a 40-character hash, it is treated as a branch name. To search a single snapshot, resolve and pass the exact commit hash (optionally set `end_ref` to the same hash). `entity_types` must use uppercase enum values: `FILESYSTEM`, `REGISTRY`, `STRUCT`, `SYMBOL`. Returns paginated results with a session_id. Use search_next to fetch more results, search_close to end the session.",
    schema: {
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
    handler: (sdk, params) => search({ ...params, sdk }),
});
