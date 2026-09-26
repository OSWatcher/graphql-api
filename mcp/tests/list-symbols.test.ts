import { jest } from "@jest/globals";

const mockResolveBlobHash = jest.fn<any>();

jest.unstable_mockModule("../src/resolve.js", () => ({
    resolveBlobHash: mockResolveBlobHash,
}));

const { listSymbols } = await import("../src/tools/list-symbols.js");

const BLOB = "b".repeat(40);

function connection(
    edges: any[],
    hasNextPage: boolean,
    endCursor: string | null,
    totalCount: number,
) {
    return {
        blobs: [
            {
                has_symbolConnection: {
                    totalCount,
                    edges,
                    pageInfo: { hasNextPage, endCursor },
                },
            },
        ],
    };
}

describe("listSymbols", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockResolveBlobHash.mockResolvedValue(BLOB);
    });

    it("pages the unfiltered connection", async () => {
        const sdk = {
            ListSymbols: jest
                .fn<any>()
                .mockResolvedValue(
                    connection(
                        [
                            {
                                properties: { name: "NtCreateFile" },
                                node: { hash: "s1", address: "0x1000" },
                            },
                        ],
                        true,
                        "cur1",
                        9000,
                    ),
                ),
            ListSymbolsByName: jest.fn<any>(),
        } as any;

        const page = await listSymbols(
            sdk,
            "win11",
            "/Windows/System32/ntdll.dll",
            undefined,
            1,
        );

        expect(sdk.ListSymbols).toHaveBeenCalledWith({
            blobHash: BLOB,
            first: 1,
            after: undefined,
        });
        expect(sdk.ListSymbolsByName).not.toHaveBeenCalled();
        expect(page).toEqual({
            items: [{ name: "NtCreateFile", hash: "s1", address: "0x1000" }],
            has_more: true,
            next_cursor: "cur1",
            total_count: 9000,
        });
    });

    it("uses the by-name document when name is given, and forwards the cursor", async () => {
        const sdk = {
            ListSymbols: jest.fn<any>(),
            ListSymbolsByName: jest
                .fn<any>()
                .mockResolvedValue(
                    connection(
                        [
                            {
                                properties: { name: "NtCreateFile" },
                                node: { hash: "s1", address: "0x1000" },
                            },
                        ],
                        false,
                        "cur2",
                        1,
                    ),
                ),
        } as any;

        const page = await listSymbols(
            sdk,
            "win11",
            "/Windows/System32/ntdll.dll",
            "NtCreateFile",
            50,
            "cur1",
        );

        expect(sdk.ListSymbolsByName).toHaveBeenCalledWith({
            blobHash: BLOB,
            symbolName: "NtCreateFile",
            first: 50,
            after: "cur1",
        });
        expect(sdk.ListSymbols).not.toHaveBeenCalled();
        expect(page.has_more).toBe(false);
        expect(page.next_cursor).toBeNull();
        expect(page.total_count).toBe(1);
    });

    it("throws when the blob has no PDB data", async () => {
        const sdk = {
            ListSymbols: jest.fn<any>().mockResolvedValue({ blobs: [] }),
            ListSymbolsByName: jest.fn<any>(),
        } as any;

        await expect(
            listSymbols(sdk, "win11", "/Windows/readme.txt"),
        ).rejects.toThrow(
            "/Windows/readme.txt has no PDB symbol or struct data",
        );
    });
});
