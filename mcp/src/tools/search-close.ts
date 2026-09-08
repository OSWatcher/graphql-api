import { GraphqlSdk } from "../graphql/client.js";

export async function searchClose(
    sdk: GraphqlSdk,
    session_id: string,
): Promise<boolean> {
    const result = await sdk.SearchClose({ sessionId: session_id });
    return result.searchClose;
}
