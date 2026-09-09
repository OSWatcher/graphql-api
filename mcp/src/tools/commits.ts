import { z } from "zod";
import { GraphqlSdk } from "../graphql/client.js";
import { CommitHistoryDirection } from "../graphql/generated/sdk.js";
import { defineTool } from "../types.js";

export interface CommitResult {
    hash: string;
    name: string;
    description: string | null;
    date: string;
}

export async function listCommits(
    sdk: GraphqlSdk,
    branch: string,
    limit?: number,
): Promise<CommitResult[]> {
    // Resolve branch name to HEAD commit hash
    const branchesResult = await sdk.FetchBranches();
    const matched = branchesResult.branches.find(
        (b) => b.name.toLowerCase() === branch.toLowerCase(),
    );

    if (!matched) {
        const available = branchesResult.branches.map((b) => b.name).join(", ");
        throw new Error(
            `Branch "${branch}" not found. Available branches: ${available}`,
        );
    }

    if (!matched.tracks) {
        throw new Error(`Branch "${branch}" has no commits`);
    }

    const headHash = matched.tracks.hash;

    // Fetch commit history starting from HEAD
    const historyResult = await sdk.FetchCommitHistory({
        commitHash: headHash,
        direction: CommitHistoryDirection.Backward,
    });

    let commits = historyResult.fetchCommitHistory.map((c) => ({
        hash: c.hash,
        name: c.name,
        description: c.description ?? null,
        date: c.date,
    }));

    if (limit && limit > 0) {
        commits = commits.slice(0, limit);
    }

    return commits;
}

export default defineTool({
    name: "list_commits",
    description: "List commits (OS snapshots/updates) on a branch",
    schema: {
        branch: z.string().describe("Branch name (e.g. 'windows_11_23h2')"),
        limit: z
            .number()
            .int()
            .positive()
            .optional()
            .describe("Maximum number of commits to return"),
    },
    handler: (sdk, { branch, limit }) => listCommits(sdk, branch, limit),
});
