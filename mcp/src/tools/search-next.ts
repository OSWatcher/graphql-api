import { z } from "zod";
import { GraphqlSdk } from "../graphql/client.js";
import { SearchResponse } from "./search.js";
import { defineTool } from "../types.js";

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

export default defineTool({
    name: "search_next",
    description:
        "Fetch the next page of results from a paginated search session. Returns the same format as search. When has_more is false, the session is automatically closed.",
    schema: {
        session_id: z
            .string()
            .describe("Session ID returned by a previous search call"),
    },
    handler: (sdk, { session_id }) => searchNext(sdk, session_id),
});
