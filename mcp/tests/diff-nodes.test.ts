import { jest } from "@jest/globals";

const mockDiffNodesAt = jest.fn<any>();

jest.unstable_mockModule("../src/graphql/generated/sdk.js", () => ({
    DiffStatus: {
        New: "NEW",
        Mod: "MOD",
        Del: "DEL",
        Unchanged: "UNCHANGED",
    },
}));

const { diffNodes } = await import("../src/tools/diff-nodes.js");
const sdk = {
    DiffNodesAt: mockDiffNodesAt,
} as any;

describe("diffNodes", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("diffs registry nodes with WinRegKey parent_label", async () => {
        mockDiffNodesAt.mockResolvedValue({
            diffNodesAt: {
                total_count: 2,
                items: [
                    {
                        status: "MOD",
                        path: "HKLM/SOFTWARE/Microsoft",
                        type: "WinRegKey",
                        old_props: { hash: "old1", properties: {} },
                        new_props: { hash: "new1", properties: {} },
                    },
                    {
                        status: "NEW",
                        path: "HKLM/SOFTWARE/Microsoft/NewKey",
                        type: "WinRegKey",
                        old_props: null,
                        new_props: { hash: "new2", properties: {} },
                    },
                ],
            },
        });

        const result = await diffNodes({
            sdk,
            base_node_hash: "basehash",
            diffee_node_hash: "diffeehash",
            parent_label: "WinRegKey",
            filter: ["WinRegKey", "WinRegValue"],
        });

        expect(mockDiffNodesAt).toHaveBeenCalledWith({
            parentLabel: "WinRegKey",
            baseNodeHash: "basehash",
            diffeeNodeHash: "diffeehash",
            atPath: "/",
            maxDepth: undefined,
            withIntermediates: false,
            filter: ["WinRegKey", "WinRegValue"],
            options: undefined,
        });
        expect(result.total_count).toBe(2);
        expect(result.items).toHaveLength(2);
    });

    it("diffs symbols with Blob parent_label and at_path for struct fields", async () => {
        mockDiffNodesAt.mockResolvedValue({
            diffNodesAt: {
                total_count: 1,
                items: [
                    {
                        status: "MOD",
                        path: "_EPROCESS/Pcb",
                        type: "StructField",
                        old_props: { hash: "old1", properties: { offset: 0 } },
                        new_props: { hash: "new1", properties: { offset: 8 } },
                    },
                ],
            },
        });

        const result = await diffNodes({
            sdk,
            base_node_hash: "blobhash_a",
            diffee_node_hash: "blobhash_b",
            parent_label: "Blob",
            filter: ["StructField"],
            at_path: "/_EPROCESS",
        });

        expect(mockDiffNodesAt).toHaveBeenCalledWith({
            parentLabel: "Blob",
            baseNodeHash: "blobhash_a",
            diffeeNodeHash: "blobhash_b",
            atPath: "/_EPROCESS",
            maxDepth: undefined,
            withIntermediates: false,
            filter: ["StructField"],
            options: undefined,
        });
        expect(result.total_count).toBe(1);
    });

    it("forwards pagination and status filter options", async () => {
        mockDiffNodesAt.mockResolvedValue({
            diffNodesAt: { total_count: 0, items: [] },
        });

        await diffNodes({
            sdk,
            base_node_hash: "a",
            diffee_node_hash: "b",
            parent_label: "Tree",
            filter: ["Tree", "Blob"],
            limit: 50,
            offset: 10,
            status_filter: ["NEW", "MOD"],
        });

        expect(mockDiffNodesAt).toHaveBeenCalledWith(
            expect.objectContaining({
                options: {
                    limit: 50,
                    offset: 10,
                    status_filter: ["NEW", "MOD"],
                },
            }),
        );
    });

    it("throws on invalid status filter", async () => {
        await expect(
            diffNodes({
                sdk,
                base_node_hash: "a",
                diffee_node_hash: "b",
                parent_label: "WinRegKey",
                filter: ["WinRegKey"],
                status_filter: ["INVALID"],
            }),
        ).rejects.toThrow('Invalid diff status "INVALID"');
    });
});

describe("diffNodes request body (regression)", () => {
    it.each([
        ["Symbol", ["Symbol"]],
        ["Struct", ["Struct"]],
        ["StructField", ["StructField"]],
    ])(
        "forwards max_depth 1 and filter %s verbatim",
        async (_label, filter) => {
            // max_depth=1 is required for these labels: without it the procedure
            // recurses looking for children of the same label, finds none, and
            // returns 0 results.
            mockDiffNodesAt.mockResolvedValue({
                diffNodesAt: { total_count: 0, items: [] },
            });

            await diffNodes({
                sdk,
                base_node_hash: "a".repeat(40),
                diffee_node_hash: "b".repeat(40),
                parent_label: "Blob",
                filter,
                max_depth: 1,
            });

            expect(mockDiffNodesAt).toHaveBeenCalledWith(
                expect.objectContaining({
                    maxDepth: 1,
                    filter,
                    parentLabel: "Blob",
                }),
            );
        },
    );
});
