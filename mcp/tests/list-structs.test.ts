import { jest } from "@jest/globals";

const mockResolveBlobHash = jest.fn<any>();

jest.unstable_mockModule("../src/resolve.js", () => ({
    resolveBlobHash: mockResolveBlobHash,
}));

const { listStructs } = await import("../src/tools/list-structs.js");

const BLOB = "b".repeat(40);

function connection(edges: any[], hasNextPage: boolean, endCursor: string | null, totalCount: number) {
    return {
        blobs: [
            {
                has_structConnection: {
                    totalCount,
                    edges,
                    pageInfo: { hasNextPage, endCursor },
                },
            },
        ],
    };
}

describe("listStructs", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockResolveBlobHash.mockResolvedValue(BLOB);
    });

    it("pages the unfiltered connection", async () => {
        const sdk = {
            ListStructs: jest.fn<any>().mockResolvedValue(
                connection(
                    [
                        { properties: { name: "_EPROCESS" }, node: { hash: "s1", size: 1856, kind: "struct" } },
                    ],
                    true,
                    "cur1",
                    9000,
                ),
            ),
            ListStructsByName: jest.fn<any>(),
        } as any;

        const page = await listStructs(sdk, "win11", "/Windows/System32/ntoskrnl.exe", undefined, 1);

        expect(sdk.ListStructs).toHaveBeenCalledWith({
            blobHash: BLOB,
            first: 1,
            after: undefined,
        });
        expect(sdk.ListStructsByName).not.toHaveBeenCalled();
        expect(page).toEqual({
            items: [{ name: "_EPROCESS", hash: "s1", size: 1856, kind: "struct" }],
            has_more: true,
            next_cursor: "cur1",
            total_count: 9000,
        });
    });

    it("uses the by-name document when name is given, and forwards the cursor", async () => {
        const sdk = {
            ListStructs: jest.fn<any>(),
            ListStructsByName: jest.fn<any>().mockResolvedValue(
                connection(
                    [{ properties: { name: "_EPROCESS" }, node: { hash: "s1", size: 1856, kind: "struct" } }],
                    false,
                    "cur2",
                    1,
                ),
            ),
        } as any;

        const page = await listStructs(
            sdk,
            "win11",
            "/Windows/System32/ntoskrnl.exe",
            "_EPROCESS",
            50,
            "cur1",
        );

        expect(sdk.ListStructsByName).toHaveBeenCalledWith({
            blobHash: BLOB,
            structName: "_EPROCESS",
            first: 50,
            after: "cur1",
        });
        expect(sdk.ListStructs).not.toHaveBeenCalled();
        expect(page.has_more).toBe(false);
        expect(page.next_cursor).toBeNull();
        expect(page.total_count).toBe(1);
    });

    it("throws when the blob has no PDB data", async () => {
        const sdk = {
            ListStructs: jest.fn<any>().mockResolvedValue({ blobs: [] }),
            ListStructsByName: jest.fn<any>(),
        } as any;

        await expect(
            listStructs(sdk, "win11", "/Windows/readme.txt"),
        ).rejects.toThrow("/Windows/readme.txt has no PDB symbol or struct data");
    });
});
