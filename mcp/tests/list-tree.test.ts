import { jest } from "@jest/globals";

const mockResolveTreeHash = jest.fn<any>();

jest.unstable_mockModule("../src/resolve.js", () => ({
    resolveTreeHash: mockResolveTreeHash,
}));

const { listTree } = await import("../src/tools/list-tree.js");

const TREE = "t".repeat(40);

describe("listTree", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockResolveTreeHash.mockResolvedValue(TREE);
    });

    it("requests both connections on the first page and splits the result", async () => {
        const sdk = {
            ListTree: jest.fn<any>().mockResolvedValue({
                trees: [
                    {
                        child_treesConnection: {
                            totalCount: 1,
                            edges: [{ properties: { name: "en-US" }, node: { hash: "d1" } }],
                            pageInfo: { hasNextPage: false, endCursor: "dc" },
                        },
                        child_blobsConnection: {
                            totalCount: 2,
                            edges: [{ properties: { name: "ntfs.sys" }, node: { hash: "b1" } }],
                            pageInfo: { hasNextPage: true, endCursor: "bc" },
                        },
                    },
                ],
            }),
        } as any;

        const page = await listTree(sdk, "win11", "/Windows/System32/drivers", 1);

        expect(sdk.ListTree).toHaveBeenCalledWith({
            treeHash: TREE,
            first: 1,
            afterTrees: undefined,
            afterBlobs: undefined,
            includeTrees: true,
            includeBlobs: true,
        });
        expect(page.directories).toEqual([{ name: "en-US", hash: "d1" }]);
        expect(page.files).toEqual([{ name: "ntfs.sys", hash: "b1" }]);
        expect(page.has_more).toBe(true);
        expect(typeof page.next_cursor).toBe("string");
    });

    it("stops requesting a connection that is already exhausted", async () => {
        const first = {
            trees: [
                {
                    child_treesConnection: {
                        totalCount: 1,
                        edges: [{ properties: { name: "en-US" }, node: { hash: "d1" } }],
                        pageInfo: { hasNextPage: false, endCursor: "dc" },
                    },
                    child_blobsConnection: {
                        totalCount: 2,
                        edges: [{ properties: { name: "a.sys" }, node: { hash: "b1" } }],
                        pageInfo: { hasNextPage: true, endCursor: "bc" },
                    },
                },
            ],
        };
        const second = {
            trees: [
                {
                    child_blobsConnection: {
                        totalCount: 2,
                        edges: [{ properties: { name: "b.sys" }, node: { hash: "b2" } }],
                        pageInfo: { hasNextPage: false, endCursor: "bc2" },
                    },
                },
            ],
        };
        const sdk = {
            ListTree: jest
                .fn<any>()
                .mockResolvedValueOnce(first)
                .mockResolvedValueOnce(second),
        } as any;

        const page1 = await listTree(sdk, "win11", "/W", 1);
        const page2 = await listTree(sdk, "win11", "/W", 1, page1.next_cursor!);

        expect(sdk.ListTree).toHaveBeenLastCalledWith({
            treeHash: TREE,
            first: 1,
            afterTrees: undefined,
            afterBlobs: "bc",
            includeTrees: false,
            includeBlobs: true,
        });
        expect(page2.directories).toEqual([]);
        expect(page2.files).toEqual([{ name: "b.sys", hash: "b2" }]);
        expect(page2.has_more).toBe(false);
        expect(page2.next_cursor).toBeNull();
    });

    it("throws when the path is not a directory in this ref", async () => {
        const sdk = { ListTree: jest.fn<any>().mockResolvedValue({ trees: [] }) } as any;

        await expect(listTree(sdk, "win11", "/Windows/notes.txt")).rejects.toThrow(
            "/Windows/notes.txt is not a directory in \"win11\"",
        );
    });
});
