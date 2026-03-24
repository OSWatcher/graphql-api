import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import {
    CommitHistoryDirection,
    DiffStatus,
    EntityType,
    NodeType,
    type DiffNodesAtResult,
    type CommitRange,
} from "../../src/ogm-types.js";
import type { DiffNodesAtParams } from "../../src/diff/diff.js";
import type { EntityRootResult } from "../../src/git-log/types.js";

const mockResolveRef = jest.fn<
    (driver: unknown, ref: string) => Promise<string>
>();
const mockDiffNodesAtInternal = jest.fn<
    (
        driver: unknown,
        params: DiffNodesAtParams,
    ) => Promise<DiffNodesAtResult>
>();
const mockGetEntityRoot = jest.fn<
    (
        driver: unknown,
        commitHash: string,
        entityType: EntityType,
        path: string,
    ) => Promise<EntityRootResult>
>();

jest.unstable_mockModule("../../src/commits.js", () => ({
    resolveRef: mockResolveRef,
}));

jest.unstable_mockModule("../../src/diff/diff.js", () => ({
    diffNodesAtInternal: mockDiffNodesAtInternal,
}));

jest.unstable_mockModule("../../src/git-log/path-resolvers.js", () => ({
    get_entity_root: mockGetEntityRoot,
}));

const { git_log_stream } = await import("../../src/git-log/index.js");

function createMockDriver(
    commits: Array<{
        hash: string;
        name: string;
        date: string;
        description?: string;
    }>,
) {
    const records = commits.map((commit) => ({
        get: (key: string) => {
            if (key !== "commit") {
                throw new Error(`Unexpected record key: ${key}`);
            }

            return { properties: commit };
        },
    }));

    return {
        session: () => ({
            executeRead: async (
                callback: (tx: {
                    run: (
                        query: string,
                        params: Record<string, unknown>,
                    ) => Promise<{ records: typeof records }>;
                }) => Promise<unknown>,
            ) =>
                callback({
                    run: async (
                        _query: string,
                        _params: Record<string, unknown>,
                    ) => ({ records }),
                }),
            close: async () => undefined,
        }),
    } as any;
}

async function collect<T>(iterable: AsyncIterable<T>): Promise<T[]> {
    const items: T[] = [];
    for await (const item of iterable) {
        items.push(item);
    }
    return items;
}

describe("git_log_stream", () => {
    const commitRange: CommitRange = {
        startRef: "commit-new",
        direction: CommitHistoryDirection.Backward,
    };

    beforeEach(() => {
        mockResolveRef.mockReset();
        mockResolveRef.mockImplementation(async (_driver, ref) => ref);
        mockDiffNodesAtInternal.mockReset();
        mockGetEntityRoot.mockReset();
    });

    it("yields a NEW entry with null base_commit when the entity first appears", async () => {
        const driver = createMockDriver([
            {
                hash: "commit-new",
                name: "newer",
                date: "2002-01-01T00:00:00Z",
            },
            {
                hash: "commit-old",
                name: "older",
                date: "2001-01-01T00:00:00Z",
            },
        ]);

        mockGetEntityRoot.mockImplementation(
            async (_driver, commitHash) =>
                ({
                    "commit-old": {
                        root_hash: "root-old",
                        root_label: "Struct",
                        remaining_path: "Buffer",
                    },
                    "commit-new": {
                        root_hash: "root-new",
                        root_label: "Struct",
                        remaining_path: "Buffer",
                    },
                })[commitHash] ?? null,
        );

        mockDiffNodesAtInternal.mockImplementation(
            async (_driver, params) => ({
                total_count: 1,
                items: [
                    {
                        status:
                            params.base_node_hash === null
                                ? DiffStatus.New
                                : DiffStatus.Mod,
                        path: "/",
                        type: NodeType.StructField,
                        old_props: null,
                        new_props: null,
                    },
                ],
            }),
        );

        const entries = await collect(
            git_log_stream(
                driver,
                "/Windows/System32/kernel32.dll::_UNICODE_STRING/Buffer",
                EntityType.Struct,
                commitRange,
                { order: "ASC" },
            ),
        );

        expect(entries).toHaveLength(2);
        expect(entries[0].base_commit).toBeNull();
        expect(entries[0].diffee_commit.hash).toBe("commit-old");
        expect(entries[0].diff.status).toBe(DiffStatus.New);
        expect(entries[0].diff.path).toBe(
            "/Windows/System32/kernel32.dll::_UNICODE_STRING/Buffer",
        );
        expect(entries[1].base_commit?.hash).toBe("commit-old");
        expect(entries[1].diffee_commit.hash).toBe("commit-new");
        expect(entries[1].diff.status).toBe(DiffStatus.Mod);

        expect(mockDiffNodesAtInternal).toHaveBeenNthCalledWith(
            1,
            driver,
            expect.objectContaining({
                parent_label: "Struct",
                base_node_hash: null,
                diffee_node_hash: "root-old",
                at_path: "/Buffer",
            }),
        );
        expect(mockDiffNodesAtInternal).toHaveBeenNthCalledWith(
            2,
            driver,
            expect.objectContaining({
                parent_label: "Struct",
                base_node_hash: "root-old",
                diffee_node_hash: "root-new",
                at_path: "/Buffer",
            }),
        );
    });

    it("still emits a first-appearance entry when only one commit is in range", async () => {
        const driver = createMockDriver([
            {
                hash: "commit-only",
                name: "only",
                date: "2001-01-01T00:00:00Z",
            },
        ]);

        mockGetEntityRoot.mockResolvedValue({
            root_hash: "root-only",
            root_label: "Symbol",
            remaining_path: "",
        });

        mockDiffNodesAtInternal.mockResolvedValue({
            total_count: 1,
            items: [
                {
                    status: DiffStatus.New,
                    path: "/",
                    type: NodeType.Symbol,
                    old_props: null,
                    new_props: null,
                },
            ],
        });

        const entries = await collect(
            git_log_stream(
                driver,
                "/Windows/System32/kernel32.dll::AddLocalAlternateComputerNameA",
                EntityType.Symbol,
                commitRange,
                { order: "ASC" },
            ),
        );

        expect(entries).toHaveLength(1);
        expect(entries[0].base_commit).toBeNull();
        expect(entries[0].diffee_commit.hash).toBe("commit-only");
        expect(entries[0].diff.status).toBe(DiffStatus.New);
        expect(mockDiffNodesAtInternal).toHaveBeenCalledWith(
            driver,
            expect.objectContaining({
                parent_label: "Symbol",
                base_node_hash: null,
                diffee_node_hash: "root-only",
                at_path: "/",
            }),
        );
    });
});
