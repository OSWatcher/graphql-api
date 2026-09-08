import { jest } from "@jest/globals";

const mockResolveCommitRef = jest.fn<any>();
const mockTraversePath = jest.fn<any>();

jest.unstable_mockModule("../src/tools/resolve-ref.js", () => ({
    resolveCommitRef: mockResolveCommitRef,
}));

const { traversePath } = await import("../src/tools/traverse-path.js");
const sdk = {
    TraversePath: mockTraversePath,
} as any;

describe("traversePath", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("returns hash for an existing path", async () => {
        mockResolveCommitRef.mockResolvedValue({
            commitHash: "a".repeat(40),
            filesystemHash: "f".repeat(40),
        });
        mockTraversePath.mockResolvedValue({
            traversePath: "nodehash123",
        });

        const result = await traversePath(
            sdk,
            "windows_11_23h2",
            "/Windows/System32/ntdll.dll",
        );

        expect(mockResolveCommitRef).toHaveBeenCalledWith(
            sdk,
            "windows_11_23h2",
        );
        expect(mockTraversePath).toHaveBeenCalledWith({
            parentLabel: "Tree",
            treeHash: "f".repeat(40),
            path: "/Windows/System32/ntdll.dll",
        });
        expect(result).toEqual({ hash: "nodehash123" });
    });

    it("returns null hash when path does not exist", async () => {
        mockResolveCommitRef.mockResolvedValue({
            commitHash: "a".repeat(40),
            filesystemHash: "f".repeat(40),
        });
        mockTraversePath.mockResolvedValue({ traversePath: null });

        const result = await traversePath(
            sdk,
            "windows_11_23h2",
            "/nonexistent/path",
        );

        expect(result).toEqual({ hash: null });
    });

    it("throws when ref cannot be resolved", async () => {
        mockResolveCommitRef.mockRejectedValue(
            new Error("Branch or commit not found: missing"),
        );

        await expect(traversePath(sdk, "missing", "/")).rejects.toThrow(
            "Branch or commit not found: missing",
        );

        expect(mockTraversePath).not.toHaveBeenCalled();
    });
});
