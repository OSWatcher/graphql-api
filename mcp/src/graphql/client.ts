import { DocumentNode, print } from "graphql";
import { getSdk } from "./generated/sdk.js";

const GRAPHQL_API_URL =
    process.env.GRAPHQL_API_URL || "http://localhost:4000/graphql";

interface GraphQLResponse<T> {
    data?: T;
    errors?: Array<{ message: string }>;
}

export type GraphqlSdk = ReturnType<typeof getSdk>;

// The GraphQL API is public, read-only and unauthenticated, so there is no
// credential to forward and the SDK is request-invariant.
export function createSdk(): GraphqlSdk {
    async function requester<R, V>(doc: DocumentNode, vars?: V): Promise<R> {
        const response = await fetch(GRAPHQL_API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                query: print(doc),
                variables: vars,
            }),
        });

        if (!response.ok) {
            throw new Error(
                `GraphQL API returned ${response.status}: ${response.statusText}`,
            );
        }

        const json = (await response.json()) as GraphQLResponse<R>;

        if (json.errors?.length) {
            throw new Error(
                `GraphQL error: ${json.errors.map((e) => e.message).join(", ")}`,
            );
        }

        if (!json.data) {
            throw new Error("GraphQL response missing data");
        }

        return json.data;
    }

    return getSdk(requester);
}
