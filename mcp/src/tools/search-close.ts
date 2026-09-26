import { z } from "zod";
import { GraphqlSdk } from "../graphql/client.js";
import { defineTool } from "../types.js";

export async function searchClose(
    sdk: GraphqlSdk,
    session_id: string,
): Promise<boolean> {
    const result = await sdk.SearchClose({ sessionId: session_id });
    return result.searchClose;
}

export default defineTool({
    name: "search_close",
    description:
        "Close a search session to free server resources. Sessions auto-expire after 5 minutes of inactivity, so this is optional but recommended when done searching.",
    schema: {
        session_id: z.string().describe("Session ID to close"),
    },
    handler: async (sdk, { session_id }) => {
        const closed = await searchClose(sdk, session_id);
        return closed
            ? "Session closed successfully."
            : "Session not found (may have already expired).";
    },
});
