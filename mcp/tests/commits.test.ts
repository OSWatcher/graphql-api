import { jest } from "@jest/globals";

const mockFetchBranches = jest.fn<any>();
const mockFetchCommitHistory = jest.fn<any>();

jest.unstable_mockModule("../src/graphql/generated/sdk.js", () => ({
    CommitHistoryDirection: {
        Forward: "FORWARD",
        Backward: "BACKWARD",
    },
}));

const { listCommits } = await import("../src/tools/commits.js");
const sdk = {
    FetchBranches: mockFetchBranches,
    FetchCommitHistory: mockFetchCommitHistory,
} as any;

const MOCK_BRANCHES_RESPONSE = {
    branches: [
        {
            name: "windows_11_23h2",
            tracks: {
                hash: "aaaa".repeat(10),
                name: "Windows 11 23H2",
                date: "2023-10-31T00:00:00Z",
            },
        },
        {
            name: "ubuntu_22.04",
            tracks: {
                hash: "bbbb".repeat(10),
                name: "Ubuntu 22.04",
                date: "2022-04-21T00:00:00Z",
            },
        },
    ],
};

const MOCK_COMMIT_HISTORY = {
    fetchCommitHistory: [
        {
            hash: "aaaa".repeat(10),
            name: "Windows 11 23H2",
            description: "Initial release",
            date: "2023-10-31T00:00:00Z",
            previous: { hash: "1111".repeat(10) },
            next: [],
        },
        {
            hash: "1111".repeat(10),
            name: "KB5031354",
            description: "October 2023 update",
            date: "2023-10-10T00:00:00Z",
            previous: { hash: "2222".repeat(10) },
            next: [{ hash: "aaaa".repeat(10) }],
        },
        {
            hash: "2222".repeat(10),
            name: "KB5030219",
            description: null,
            date: "2023-09-12T00:00:00Z",
            previous: null,
            next: [{ hash: "1111".repeat(10) }],
        },
    ],
};

describe("listCommits", () => {
    beforeEach(() => {
        mockFetchBranches.mockReset();
        mockFetchCommitHistory.mockReset();
        mockFetchBranches.mockResolvedValue(MOCK_BRANCHES_RESPONSE);
        mockFetchCommitHistory.mockResolvedValue(MOCK_COMMIT_HISTORY);
    });

    it("resolves branch and returns commit history", async () => {
        const result = await listCommits(sdk, "windows_11_23h2");

        expect(mockFetchBranches).toHaveBeenCalledTimes(1);
        expect(mockFetchCommitHistory).toHaveBeenCalledWith({
            commitHash: "aaaa".repeat(10),
            direction: "BACKWARD",
        });
        expect(result).toHaveLength(3);
        expect(result[0]).toEqual({
            hash: "aaaa".repeat(10),
            name: "Windows 11 23H2",
            description: "Initial release",
            date: "2023-10-31T00:00:00Z",
        });
    });

    it("resolves branch name case-insensitively", async () => {
        const result = await listCommits(sdk, "Windows_11_23H2");

        expect(result).toHaveLength(3);
    });

    it("applies limit to results", async () => {
        const result = await listCommits(sdk, "windows_11_23h2", 2);

        expect(result).toHaveLength(2);
        expect(result[0].name).toBe("Windows 11 23H2");
        expect(result[1].name).toBe("KB5031354");
    });

    it("throws for unknown branch", async () => {
        await expect(listCommits(sdk, "nonexistent")).rejects.toThrow(
            'Branch "nonexistent" not found',
        );

        expect(mockFetchCommitHistory).not.toHaveBeenCalled();
    });

    it("includes available branches in error message", async () => {
        await expect(listCommits(sdk, "nonexistent")).rejects.toThrow(
            "windows_11_23h2, ubuntu_22.04",
        );
    });

    it("handles null description", async () => {
        const result = await listCommits(sdk, "windows_11_23h2");

        expect(result[2].description).toBeNull();
    });

    it("propagates GraphQL errors from branches query", async () => {
        mockFetchBranches.mockRejectedValue(
            new Error("GraphQL error: Connection refused"),
        );

        await expect(listCommits(sdk, "windows_11_23h2")).rejects.toThrow(
            "Connection refused",
        );
    });

    it("propagates GraphQL errors from commit history query", async () => {
        mockFetchCommitHistory.mockRejectedValue(
            new Error("GraphQL error: Invalid commit hash"),
        );

        await expect(listCommits(sdk, "windows_11_23h2")).rejects.toThrow(
            "Invalid commit hash",
        );
    });
});
