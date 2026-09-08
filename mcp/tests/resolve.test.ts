import { jest } from "@jest/globals";
import {
    resolveCommitRef,
    resolveNodeHash,
    resolveTreeHash,
    resolveBlobHash,
    resolveHiveRoot,
    HIVE_PATHS,
} from "../src/resolve.js";

const FS = "f".repeat(40);
const COMMIT = "a".repeat(40);

function makeSdk(overrides: Record<string, unknown> = {}) {
    return {
        ResolveCommitRef: jest.fn<any>().mockResolvedValue({
            branches: [
                {
                    name: "win11",
                    tracks: { hash: COMMIT, filesystem: { hash: FS } },
                },
            ],
            commits: [],
        }),
        TraversePath: jest
            .fn<any>()
            .mockResolvedValue({ traversePath: "node1" }),
        GetBlobWinRegRoot: jest.fn<any>().mockResolvedValue({
            blobs: [{ hash: "node1", has_winreg: { hash: "winreg1" } }],
        }),
        ...overrides,
    } as any;
}

describe("resolveCommitRef", () => {
    it("resolves a branch name", async () => {
        const sdk = makeSdk();
        await expect(resolveCommitRef(sdk, "win11")).resolves.toEqual({
            commitHash: COMMIT,
            filesystemHash: FS,
        });
    });

    it("falls back to a commit hash", async () => {
        const sdk = makeSdk({
            ResolveCommitRef: jest.fn<any>().mockResolvedValue({
                branches: [],
                commits: [{ hash: COMMIT, filesystem: { hash: FS } }],
            }),
        });
        await expect(resolveCommitRef(sdk, COMMIT)).resolves.toEqual({
            commitHash: COMMIT,
            filesystemHash: FS,
        });
    });

    it("throws when the branch tracks no commit", async () => {
        const sdk = makeSdk({
            ResolveCommitRef: jest.fn<any>().mockResolvedValue({
                branches: [{ name: "empty", tracks: null }],
                commits: [],
            }),
        });
        await expect(resolveCommitRef(sdk, "empty")).rejects.toThrow(
            'Branch "empty" has no tracked commit',
        );
    });

    it("throws when nothing matches", async () => {
        const sdk = makeSdk({
            ResolveCommitRef: jest
                .fn<any>()
                .mockResolvedValue({ branches: [], commits: [] }),
        });
        await expect(resolveCommitRef(sdk, "nope")).rejects.toThrow(
            "Branch or commit not found: nope",
        );
    });
});

describe("resolveNodeHash", () => {
    it("traverses from the resolved filesystem root", async () => {
        const sdk = makeSdk();
        await expect(
            resolveNodeHash(sdk, "win11", "/Windows/System32"),
        ).resolves.toBe("node1");
        expect(sdk.TraversePath).toHaveBeenCalledWith({
            parentLabel: "Tree",
            treeHash: FS,
            path: "/Windows/System32",
        });
    });

    it("returns null for a missing path", async () => {
        const sdk = makeSdk({
            TraversePath: jest
                .fn<any>()
                .mockResolvedValue({ traversePath: null }),
        });
        await expect(
            resolveNodeHash(sdk, "win11", "/nope"),
        ).resolves.toBeNull();
    });
});

describe("resolveTreeHash / resolveBlobHash", () => {
    it("return the hash when the path exists", async () => {
        await expect(resolveTreeHash(makeSdk(), "win11", "/W")).resolves.toBe(
            "node1",
        );
        await expect(
            resolveBlobHash(makeSdk(), "win11", "/W/a.dll"),
        ).resolves.toBe("node1");
    });

    it("throw a path-shaped error when it does not", async () => {
        const sdk = makeSdk({
            TraversePath: jest
                .fn<any>()
                .mockResolvedValue({ traversePath: null }),
        });
        await expect(resolveTreeHash(sdk, "win11", "/nope")).rejects.toThrow(
            'Directory not found in "win11": /nope',
        );
        await expect(resolveBlobHash(sdk, "win11", "/nope")).rejects.toThrow(
            'File not found in "win11": /nope',
        );
    });
});

describe("resolveHiveRoot", () => {
    it("maps the hive enum to its on-disk path and follows HAS_WINREG", async () => {
        const sdk = makeSdk();
        await expect(resolveHiveRoot(sdk, "win11", "SOFTWARE")).resolves.toBe(
            "winreg1",
        );
        expect(sdk.TraversePath).toHaveBeenCalledWith({
            parentLabel: "Tree",
            treeHash: FS,
            path: HIVE_PATHS.SOFTWARE,
        });
        expect(HIVE_PATHS.SOFTWARE).toBe("/Windows/System32/config/SOFTWARE");
    });

    it("throws when the blob carries no registry root", async () => {
        const sdk = makeSdk({
            GetBlobWinRegRoot: jest.fn<any>().mockResolvedValue({
                blobs: [{ hash: "node1", has_winreg: null }],
            }),
        });
        await expect(resolveHiveRoot(sdk, "win11", "SYSTEM")).rejects.toThrow(
            'Hive SYSTEM in "win11" has no parsed registry data',
        );
    });
});
