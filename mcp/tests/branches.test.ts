import { jest } from "@jest/globals";

const mockFetchBranches = jest.fn<any>();
const sdk = {
    FetchBranches: mockFetchBranches,
} as any;

const { listBranches } = await import("../src/tools/branches.js");

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
            name: "windows_10_22h2",
            tracks: {
                hash: "bbbb".repeat(10),
                name: "Windows 10 22H2",
                date: "2022-10-18T00:00:00Z",
            },
        },
        {
            name: "ubuntu_22.04",
            tracks: {
                hash: "cccc".repeat(10),
                name: "Ubuntu 22.04",
                date: "2022-04-21T00:00:00Z",
            },
        },
        {
            name: "empty_branch",
            tracks: null,
        },
    ],
};

describe("listBranches", () => {
    beforeEach(() => {
        mockFetchBranches.mockReset();
        mockFetchBranches.mockResolvedValue(MOCK_BRANCHES_RESPONSE);
    });

    it("returns all branches without search filter", async () => {
        const result = await listBranches(sdk);

        expect(mockFetchBranches).toHaveBeenCalledTimes(1);
        expect(result).toHaveLength(4);
        expect(result[0]).toEqual({
            name: "windows_11_23h2",
            headCommit: {
                hash: "aaaa".repeat(10),
                name: "Windows 11 23H2",
                date: "2023-10-31T00:00:00Z",
            },
        });
    });

    it("filters branches by search term (case-insensitive)", async () => {
        const result = await listBranches(sdk, "windows");

        expect(result).toHaveLength(2);
        expect(result.map((b) => b.name)).toEqual([
            "windows_11_23h2",
            "windows_10_22h2",
        ]);
    });

    it("filters with uppercase search term", async () => {
        const result = await listBranches(sdk, "UBUNTU");

        expect(result).toHaveLength(1);
        expect(result[0].name).toBe("ubuntu_22.04");
    });

    it("returns empty array when no branches match", async () => {
        const result = await listBranches(sdk, "nonexistent");

        expect(result).toHaveLength(0);
    });

    it("handles branches with null tracks", async () => {
        const result = await listBranches(sdk);
        const emptyBranch = result.find((b) => b.name === "empty_branch");

        expect(emptyBranch).toBeDefined();
        expect(emptyBranch!.headCommit).toBeNull();
    });

    it("propagates GraphQL errors", async () => {
        mockFetchBranches.mockRejectedValue(
            new Error("GraphQL error: Service unavailable"),
        );

        await expect(listBranches(sdk)).rejects.toThrow("Service unavailable");
    });
});
