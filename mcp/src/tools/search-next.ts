import { GraphqlSdk } from "../graphql/client.js";
import { SearchResponse } from "./search.js";

export async function searchNext(
    sdk: GraphqlSdk,
    session_id: string,
): Promise<SearchResponse> {
    const result = await sdk.SearchNext({ sessionId: session_id });

    const page = result.searchNext;
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
