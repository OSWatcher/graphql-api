import { jest } from "@jest/globals";

const mockSearchWithSession = jest.fn<any>();

jest.unstable_mockModule("../src/graphql/generated/sdk.js", () => ({
    CommitHistoryDirection: {
        Forward: "FORWARD",
        Backward: "BACKWARD",
    },
    EntityType: {
        Filesystem: "FILESYSTEM",
        Registry: "REGISTRY",
        Struct: "STRUCT",
        Symbol: "SYMBOL",
    },
}));

const { search } = await import("../src/tools/search.js");
const sdk = {
    SearchWithSession: mockSearchWithSession,
} as any;

function makePage(overrides: Partial<any> = {}) {
    return {
        searchWithSession: {
            session_id: "session-123",
            results: [
                {
                    type: "FILESYSTEM",
                    commit_name: "KB-5044285",
                    commit_hash: "abc123",
                    blob_path: "/Windows/System32/ntdll.dll",
                    blob_hash: "def456",
                    entity_path: null,
                    node_hash: "def456",
                },
            ],
            has_more: false,
            total_fetched: 1,
            ...overrides,
        },
    };
}

describe("search", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("searches with minimal params", async () => {
        mockSearchWithSession.mockResolvedValue(makePage());

        const result = await search({
            sdk,
            search_term: "ntdll.dll",
            start_ref: "windows",
        });

        expect(result).toEqual({
            session_id: "session-123",
            results: [
                {
                    type: "FILESYSTEM",
                    commit_name: "KB-5044285",
                    commit_hash: "abc123",
                    blob_path: "/Windows/System32/ntdll.dll",
                    blob_hash: "def456",
                    entity_path: null,
                    node_hash: "def456",
                },
            ],
            has_more: false,
            total_fetched: 1,
        });

        expect(mockSearchWithSession).toHaveBeenCalledWith({
            input: {
                commit_range: {
                    startRef: "windows",
                    direction: "BACKWARD",
                    include_updates: false,
                    branch: null,
                    endRef: null,
                },
                search_term: "ntdll.dll",
                entity_types: null,
                case_sensitive: false,
            },
            pageSize: 50,
        });
    });

    it("passes direction and end_ref", async () => {
        mockSearchWithSession.mockResolvedValue(
            makePage({ results: [], total_fetched: 0 }),
        );

        await search({
            sdk,
            search_term: "kernel32",
            start_ref: "abc123",
            direction: "FORWARD",
            end_ref: "def456",
        });

        expect(mockSearchWithSession).toHaveBeenCalledWith({
            input: {
                commit_range: {
                    startRef: "abc123",
                    direction: "FORWARD",
                    include_updates: false,
                    branch: null,
                    endRef: "def456",
                },
                search_term: "kernel32",
                entity_types: null,
                case_sensitive: false,
            },
            pageSize: 50,
        });
    });

    it("filters by entity types", async () => {
        mockSearchWithSession.mockResolvedValue(
            makePage({ results: [], total_fetched: 0 }),
        );

        await search({
            sdk,
            search_term: "_EPROCESS",
            start_ref: "windows",
            entity_types: ["STRUCT", "SYMBOL"],
        });

        expect(mockSearchWithSession).toHaveBeenCalledWith({
            input: {
                commit_range: {
                    startRef: "windows",
                    direction: "BACKWARD",
                    include_updates: false,
                    branch: null,
                    endRef: null,
                },
                search_term: "_EPROCESS",
                entity_types: ["STRUCT", "SYMBOL"],
                case_sensitive: false,
            },
            pageSize: 50,
        });
    });

    it("passes include_updates and branch filter", async () => {
        mockSearchWithSession.mockResolvedValue(
            makePage({ results: [], total_fetched: 0 }),
        );

        await search({
            sdk,
            search_term: "KB",
            start_ref: "windows_11_23h2",
            include_updates: true,
            branch: "windows_11_23h2",
        });

        expect(mockSearchWithSession).toHaveBeenCalledWith({
            input: {
                commit_range: {
                    startRef: "windows_11_23h2",
                    direction: "BACKWARD",
                    include_updates: true,
                    branch: "windows_11_23h2",
                    endRef: null,
                },
                search_term: "KB",
                entity_types: null,
                case_sensitive: false,
            },
            pageSize: 50,
        });
    });

    it("passes case_sensitive flag", async () => {
        mockSearchWithSession.mockResolvedValue(
            makePage({ results: [], total_fetched: 0 }),
        );

        await search({
            sdk,
            search_term: "NtDll",
            start_ref: "windows",
            case_sensitive: true,
        });

        expect(mockSearchWithSession).toHaveBeenCalledWith(
            expect.objectContaining({
                input: expect.objectContaining({
                    case_sensitive: true,
                }),
            }),
        );
    });

    it("passes the requested page size", async () => {
        mockSearchWithSession.mockResolvedValue(
            makePage({
                results: Array.from({ length: 10 }, (_, i) => ({
                    type: "FILESYSTEM",
                    commit_name: `commit-${i}`,
                    commit_hash: `hash-${i}`,
                    blob_path: `/path/file-${i}.dll`,
                    blob_hash: `blob-${i}`,
                    entity_path: null,
                    node_hash: `node-${i}`,
                })),
                has_more: true,
                total_fetched: 10,
            }),
        );

        const result = await search({
            sdk,
            search_term: "file",
            start_ref: "windows",
            limit: 10,
        });

        expect(result.results).toHaveLength(10);
        expect(result.has_more).toBe(true);
        expect(result.total_fetched).toBe(10);
        expect(mockSearchWithSession).toHaveBeenCalledWith(
            expect.objectContaining({
                pageSize: 10,
            }),
        );
    });

    it("rejects lowercase entity types", async () => {
        await expect(
            search({
                sdk,
                search_term: "test",
                start_ref: "windows",
                entity_types: ["filesystem" as any],
            }),
        ).rejects.toThrow(
            'Invalid entity type "filesystem". Valid types: FILESYSTEM, REGISTRY, STRUCT, SYMBOL',
        );
    });

    it("throws on invalid entity type", async () => {
        await expect(
            search({
                sdk,
                search_term: "test",
                start_ref: "windows",
                entity_types: ["INVALID" as any],
            }),
        ).rejects.toThrow('Invalid entity type "INVALID"');
    });

    it("propagates GraphQL errors", async () => {
        mockSearchWithSession.mockRejectedValue(
            new Error("GraphQL error: timeout"),
        );

        await expect(
            search({
                sdk,
                search_term: "test",
                start_ref: "windows",
            }),
        ).rejects.toThrow("GraphQL error: timeout");
    });
});
