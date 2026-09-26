import { jest } from "@jest/globals";

const mockGetBlobWinRegRoot = jest.fn<any>();

const { getWinregRoot } = await import("../src/tools/winreg-root.js");
const sdk = {
    GetBlobWinRegRoot: mockGetBlobWinRegRoot,
} as any;

describe("getWinregRoot", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("returns winreg_hash for a registry hive blob", async () => {
        mockGetBlobWinRegRoot.mockResolvedValue({
            blobs: [
                { hash: "blobhash", has_winreg: { hash: "winregroothash" } },
            ],
        });

        const result = await getWinregRoot(sdk, "blobhash");

        expect(mockGetBlobWinRegRoot).toHaveBeenCalledWith({
            hash: "blobhash",
        });
        expect(result).toEqual({ winreg_hash: "winregroothash" });
    });

    it("returns null winreg_hash for a non-hive blob", async () => {
        mockGetBlobWinRegRoot.mockResolvedValue({
            blobs: [{ hash: "blobhash", has_winreg: null }],
        });

        const result = await getWinregRoot(sdk, "blobhash");

        expect(result).toEqual({ winreg_hash: null });
    });

    it("returns null winreg_hash when blob is not found", async () => {
        mockGetBlobWinRegRoot.mockResolvedValue({ blobs: [] });

        const result = await getWinregRoot(sdk, "unknownhash");

        expect(result).toEqual({ winreg_hash: null });
    });
});
