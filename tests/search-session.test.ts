import { jest } from "@jest/globals";

const mockSearch = jest.fn<any>();

jest.unstable_mockModule("../src/search.js", () => ({
    search: mockSearch,
}));

const {
    configureSessionManager,
    createSession,
    fetchNextPage,
    closeSession,
    closeAllSessions,
} = await import("../src/search-session.js");

const driver = {} as any;
const input = {
    commit_range: { startRef: "main" },
    search_term: "ntdll",
} as any;

function makeResult(n: number) {
    return {
        type: "FILESYSTEM",
        commit_name: `c${n}`,
        commit_hash: "a".repeat(40),
        blob_path: `/f${n}`,
        blob_hash: "b".repeat(40),
        entity_path: null,
        node_hash: "c".repeat(40),
    };
}

async function* gen(count: number) {
    for (let i = 0; i < count; i++) {
        yield makeResult(i);
    }
}

describe("search sessions", () => {
    beforeEach(async () => {
        await closeAllSessions();
        jest.clearAllMocks();
        configureSessionManager({ maxSessions: 100, ttlMs: 300000 });
    });

    it("returns a session id and has_more when results exceed the page size", async () => {
        mockSearch.mockReturnValue(gen(5));

        const page = await createSession(driver, input, 2, false);

        expect(page.results).toHaveLength(2);
        expect(page.has_more).toBe(true);
        expect(page.total_fetched).toBe(2);
        expect(typeof page.session_id).toBe("string");
    });

    it("closes the session and returns a null session id on the last page", async () => {
        mockSearch.mockReturnValue(gen(3));

        const first = await createSession(driver, input, 2, false);
        const second = await fetchNextPage(first.session_id!);

        expect(second.results).toHaveLength(1);
        expect(second.has_more).toBe(false);
        expect(second.session_id).toBeNull();
        expect(second.total_fetched).toBe(3);

        await expect(fetchNextPage(first.session_id!)).rejects.toThrow(
            "Search session not found or expired",
        );
    });

    it("does not create a session when the first page exhausts the generator", async () => {
        mockSearch.mockReturnValue(gen(2));

        const page = await createSession(driver, input, 5, false);

        expect(page.results).toHaveLength(2);
        expect(page.has_more).toBe(false);
        expect(page.session_id).toBeNull();
    });

    it("rejects a new session once maxSessions is reached", async () => {
        configureSessionManager({ maxSessions: 1 });
        mockSearch.mockReturnValue(gen(10));
        await createSession(driver, input, 1, false);

        mockSearch.mockReturnValue(gen(10));
        await expect(createSession(driver, input, 1, false)).rejects.toThrow(
            "Maximum concurrent search sessions (1) reached",
        );
    });

    it("closeSession returns true for a live session and false afterwards", async () => {
        mockSearch.mockReturnValue(gen(10));
        const page = await createSession(driver, input, 1, false);

        await expect(closeSession(page.session_id!)).resolves.toBe(true);
        await expect(closeSession(page.session_id!)).resolves.toBe(false);
    });
});
