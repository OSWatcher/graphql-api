import { GraphqlSdk } from "../graphql/client.js";
import {
    CommitHistoryDirection,
    EntityType,
} from "../graphql/generated/sdk.js";

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
