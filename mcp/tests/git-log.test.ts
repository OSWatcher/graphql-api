import { jest } from "@jest/globals";
import { gitLog } from "../src/tools/git-log.js";

const entry = {
    base_commit: { hash: "b".repeat(40), name: "24h2", date: "2026-01-01" },
    diffee_commit: { hash: "d".repeat(40), name: "25h2", date: "2026-06-01" },
    diff: {
        path: "/Windows/System32/ntdll.dll",
        status: "MOD",
        type: "Blob",
        old_props: { hash: "o1", properties: { size: 1 } },
        new_props: { hash: "n1", properties: { size: 2 } },
    },
};

describe("gitLog", () => {
    it("maps entity_type onto the GraphQL `context` argument and flattens the entry", async () => {
        const sdk = {
            GitLog: jest.fn<any>().mockResolvedValue({
                gitLog: { total_count: 3, has_more: true, entries: [entry] },
            }),
        } as any;

        const page = await gitLog(sdk, {
            path: "/Windows/System32/ntdll.dll",
            entity_type: "FILESYSTEM",
            commit_range: { startRef: "windows_11", direction: "BACKWARD" },
            limit: 1,
        });

        expect(sdk.GitLog).toHaveBeenCalledWith({
            path: "/Windows/System32/ntdll.dll",
            context: "FILESYSTEM",
            commitRange: { startRef: "windows_11", direction: "BACKWARD" },
            options: {
                limit: 1,
                offset: 0,
                status_filter: undefined,
                order: undefined,
            },
        });
        expect(page.total_count).toBe(3);
        expect(page.has_more).toBe(true);
        expect(page.next_cursor).toBe("1");
        expect(page.items).toEqual([
            {
                base_commit: entry.base_commit,
                diffee_commit: entry.diffee_commit,
                status: "MOD",
                path: "/Windows/System32/ntdll.dll",
                type: "Blob",
                old_props: entry.diff.old_props,
                new_props: entry.diff.new_props,
            },
        ]);
    });

    it("advances next_cursor from the supplied offset", async () => {
        const sdk = {
            GitLog: jest.fn<any>().mockResolvedValue({
                gitLog: {
                    total_count: 30,
                    has_more: true,
                    entries: [entry, entry],
                },
            }),
        } as any;

        const page = await gitLog(sdk, {
            path: "/x",
            entity_type: "FILESYSTEM",
            commit_range: { startRef: "b" },
            limit: 2,
            offset: 10,
        });

        expect(page.next_cursor).toBe("12");
    });

    it("nulls next_cursor on the last page", async () => {
        const sdk = {
            GitLog: jest.fn<any>().mockResolvedValue({
                gitLog: { total_count: 1, has_more: false, entries: [entry] },
            }),
        } as any;

        const page = await gitLog(sdk, {
            path: "/x",
            entity_type: "FILESYSTEM",
            commit_range: { startRef: "b" },
        });

        expect(page.has_more).toBe(false);
        expect(page.next_cursor).toBeNull();
    });

    it("carries a first appearance through with a null base_commit", async () => {
        const sdk = {
            GitLog: jest.fn<any>().mockResolvedValue({
                gitLog: {
                    total_count: 1,
                    has_more: false,
                    entries: [{ ...entry, base_commit: null }],
                },
            }),
        } as any;

        const page = await gitLog(sdk, {
            path: "/x",
            entity_type: "FILESYSTEM",
            commit_range: { startRef: "b" },
        });

        expect(page.items[0].base_commit).toBeNull();
    });
});
