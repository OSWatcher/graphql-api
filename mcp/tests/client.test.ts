import { jest } from "@jest/globals";
import nock from "nock";
import { createSdk } from "../src/graphql/client.js";

const API = "http://localhost:4000";

describe("createSdk", () => {
    afterEach(() => {
        nock.cleanAll();
    });

    it("sends no Authorization header even when a caller forces a credential in", async () => {
        // The API is public and unauthenticated. Nothing in this client may
        // transmit a credential, including one a caller supplies by mistake or
        // through an untyped call site.
        let seenAuth: string | undefined = "unset";

        nock(API)
            .post("/graphql")
            .reply(function () {
                seenAuth = this.req.headers.authorization as string | undefined;
                return [200, { data: { branches: [] } }];
            });

        const sdk = (
            createSdk as unknown as (
                auth?: string,
            ) => ReturnType<typeof createSdk>
        )("Bearer super-secret");
        await sdk.FetchBranches();

        expect(seenAuth).toBeUndefined();
    });

    it("throws with the GraphQL error message", async () => {
        nock(API)
            .post("/graphql")
            .reply(200, { errors: [{ message: "boom" }] });

        const sdk = createSdk();
        await expect(sdk.FetchBranches()).rejects.toThrow(
            "GraphQL error: boom",
        );
    });

    it("throws on a non-2xx response", async () => {
        nock(API).post("/graphql").reply(502, "bad gateway");

        const sdk = createSdk();
        await expect(sdk.FetchBranches()).rejects.toThrow(
            "GraphQL API returned 502",
        );
    });
});
