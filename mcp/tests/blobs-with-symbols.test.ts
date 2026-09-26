import { jest } from "@jest/globals";

const mockResolveCommitRef = jest.fn<any>();
const mockGetBlobsWithSymbols = jest.fn<any>();

jest.unstable_mockModule("../src/resolve.js", () => ({
    resolveCommitRef: mockResolveCommitRef,
}));

const { getBlobsWithSymbols } = await import(
    "../src/tools/blobs-with-symbols.js"
);
const sdk = {
    GetBlobsWithSymbols: mockGetBlobsWithSymbols,
} as any;

describe("getBlobsWithSymbols", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("returns blobs with symbols for a commit ref", async () => {
        mockResolveCommitRef.mockResolvedValue({
            commitHash: "c".repeat(40),
            filesystemHash: "f".repeat(40),
        });
        mockGetBlobsWithSymbols.mockResolvedValue({
            getBlobsWithSymbols: [
                {
                    blob_hash: "hash1",
                    blob_path: "/Windows/System32/ntdll.dll",
                },
                {
                    blob_hash: "hash2",
                    blob_path: "/Windows/System32/kernel32.dll",
                },
            ],
        });

        const result = await getBlobsWithSymbols(sdk, "windows_11_23h2");

        expect(mockResolveCommitRef).toHaveBeenCalledWith(
            sdk,
            "windows_11_23h2",
        );
        expect(mockGetBlobsWithSymbols).toHaveBeenCalledWith({
            commitHash: "c".repeat(40),
        });
        expect(result).toEqual([
            { blob_hash: "hash1", blob_path: "/Windows/System32/ntdll.dll" },
            { blob_hash: "hash2", blob_path: "/Windows/System32/kernel32.dll" },
        ]);
    });

    it("returns empty array when no blobs have symbols", async () => {
        mockResolveCommitRef.mockResolvedValue({
            commitHash: "c".repeat(40),
            filesystemHash: "f".repeat(40),
        });
        mockGetBlobsWithSymbols.mockResolvedValue({
            getBlobsWithSymbols: [],
        });

        const result = await getBlobsWithSymbols(sdk, "some_ref");

        expect(result).toEqual([]);
    });

    it("throws when ref cannot be resolved", async () => {
        mockResolveCommitRef.mockRejectedValue(
            new Error("Branch or commit not found: missing"),
        );

        await expect(getBlobsWithSymbols(sdk, "missing")).rejects.toThrow(
            "Branch or commit not found: missing",
        );

        expect(mockGetBlobsWithSymbols).not.toHaveBeenCalled();
    });
});
