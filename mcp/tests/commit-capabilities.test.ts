import { jest } from "@jest/globals";

const mockResolveCommitRef = jest.fn<any>();

jest.unstable_mockModule("../src/resolve.js", () => ({
    resolveCommitRef: mockResolveCommitRef,
}));

const { getCommitCapabilities } = await import(
    "../src/tools/commit-capabilities.js"
);

const COMMIT = "a".repeat(40);

describe("getCommitCapabilities", () => {
    beforeEach(() => jest.clearAllMocks());

    it("resolves the ref and returns the extracted data labels", async () => {
        mockResolveCommitRef.mockResolvedValue({
            commitHash: COMMIT,
            filesystemHash: "f".repeat(40),
        });
        const sdk = {
            GetCommitCapabilities: jest.fn<any>().mockResolvedValue({
                getCommitExtractedDataLabels: ["Tree", "Blob", "WinRegKey", "Struct"],
            }),
        } as any;

        await expect(getCommitCapabilities(sdk, "win11")).resolves.toEqual({
            commit_hash: COMMIT,
            labels: ["Tree", "Blob", "WinRegKey", "Struct"],
        });
        expect(sdk.GetCommitCapabilities).toHaveBeenCalledWith({
            commitHash: COMMIT,
        });
    });
});
