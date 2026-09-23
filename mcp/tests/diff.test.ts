import { jest } from "@jest/globals";

const mockResolveCommitRef = jest.fn<any>();
const mockDiffNodesAt = jest.fn<any>();

jest.unstable_mockModule("../src/graphql/generated/sdk.js", () => ({
    DiffStatus: {
        New: "NEW",
        Mod: "MOD",
        Del: "DEL",
        Unchanged: "UNCHANGED",
    },
}));

const { diffVersions } = await import("../src/tools/diff.js");
const sdk = {
    ResolveCommitRef: mockResolveCommitRef,
    DiffNodesAt: mockDiffNodesAt,
} as any;

describe("diffVersions", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("resolves branch refs and diffs filesystem paths", async () => {
        mockResolveCommitRef
            .mockResolvedValueOnce({
                branches: [
                    {
                        name: "windows_11_23h2",
                        tracks: {
                            hash: "a".repeat(40),
                            filesystem: { hash: "1".repeat(40) },
                        },
                    },
                ],
                commits: [],
            })
            .mockResolvedValueOnce({
                branches: [],
                commits: [
                    {
                        hash: "b".repeat(40),
                        filesystem: { hash: "2".repeat(40) },
                    },
                ],
            });

        mockDiffNodesAt.mockResolvedValue({
            diffNodesAt: {
                total_count: 1,
                items: [
                    {
                        status: "MOD",
                        path: "ntdll.dll",
                        type: "Blob",
                        old_props: {
                            hash: "oldhash",
                            properties: { hash: "oldhash" },
                        },
                        new_props: {
                            hash: "newhash",
                            properties: { hash: "newhash" },
                        },
                    },
                ],
            },
        });

        const result = await diffVersions({
            sdk,
            base_ref: "windows_11_23h2",
            diffee_ref: "b".repeat(40),
            path: "/Windows/System32",
        });

        expect(mockResolveCommitRef).toHaveBeenNthCalledWith(1, {
            ref: "windows_11_23h2",
        });
        expect(mockResolveCommitRef).toHaveBeenNthCalledWith(2, {
            ref: "b".repeat(40),
        });
        expect(mockDiffNodesAt).toHaveBeenCalledWith({
            parentLabel: "Tree",
            baseNodeHash: "1".repeat(40),
            diffeeNodeHash: "2".repeat(40),
            atPath: "/Windows/System32",
            maxDepth: undefined,
            withIntermediates: false,
            filter: ["Tree", "Blob"],
            options: undefined,
        });
        expect(result).toEqual({
            base_commit_hash: "a".repeat(40),
            diffee_commit_hash: "b".repeat(40),
            total_count: 1,
            items: [
                {
                    status: "MOD",
                    path: "ntdll.dll",
                    type: "Blob",
                    old_props: {
                        hash: "oldhash",
                        properties: { hash: "oldhash" },
                    },
                    new_props: {
                        hash: "newhash",
                        properties: { hash: "newhash" },
                    },
                },
            ],
        });
    });

    it("forwards diff options and status filters", async () => {
        mockResolveCommitRef.mockResolvedValue({
            branches: [],
            commits: [
                {
                    hash: "c".repeat(40),
                    filesystem: { hash: "3".repeat(40) },
                },
            ],
        });
        mockDiffNodesAt.mockResolvedValue({
            diffNodesAt: {
                total_count: 0,
                items: [],
            },
        });

        await diffVersions({
            sdk,
            base_ref: "c".repeat(40),
            diffee_ref: "c".repeat(40),
            path: "/",
            max_depth: 0,
            limit: 25,
            offset: 10,
            status_filter: ["NEW", "MOD"],
            with_intermediates: true,
        });

        expect(mockDiffNodesAt).toHaveBeenCalledWith({
            parentLabel: "Tree",
            baseNodeHash: "3".repeat(40),
            diffeeNodeHash: "3".repeat(40),
            atPath: "/",
            maxDepth: 0,
            withIntermediates: true,
            filter: ["Tree", "Blob"],
            options: {
                limit: 25,
                offset: 10,
                status_filter: ["NEW", "MOD"],
            },
        });
    });

    it("throws when ref cannot be resolved", async () => {
        mockResolveCommitRef.mockResolvedValue({
            branches: [],
            commits: [],
        });

        await expect(
            diffVersions({
                sdk,
                base_ref: "missing",
                diffee_ref: "present",
                path: "/",
            }),
        ).rejects.toThrow("Branch or commit not found: missing");

        expect(mockDiffNodesAt).not.toHaveBeenCalled();
    });

    it("throws on invalid status filter", async () => {
        mockResolveCommitRef.mockResolvedValue({
            branches: [],
            commits: [
                {
                    hash: "d".repeat(40),
                    filesystem: { hash: "4".repeat(40) },
                },
            ],
        });

        await expect(
            diffVersions({
                sdk,
                base_ref: "d".repeat(40),
                diffee_ref: "d".repeat(40),
                path: "/",
                status_filter: ["INVALID"],
            }),
        ).rejects.toThrow('Invalid diff status "INVALID"');
    });
});

describe("diffVersions request body (regression)", () => {
    it("always sends filter: ['Tree', 'Blob'], even when the caller passes none", async () => {
        // An empty filter makes the Java procedure add only parentLabel
        // ("Tree"), silently dropping every Blob leaf and returning 0 results
        // for a recursive diff.
        mockDiffNodesAt.mockResolvedValue({
            diffNodesAt: { total_count: 0, items: [] },
        });
        mockResolveCommitRef.mockResolvedValue({
            branches: [],
            commits: [
                { hash: "a".repeat(40), filesystem: { hash: "f".repeat(40) } },
            ],
        });

        await diffVersions({
            sdk,
            base_ref: "win11-24h2",
            diffee_ref: "win11-25h2",
            path: "/",
        });

        expect(mockDiffNodesAt).toHaveBeenCalledWith(
            expect.objectContaining({
                parentLabel: "Tree",
                filter: ["Tree", "Blob"],
            }),
        );
    });
});
