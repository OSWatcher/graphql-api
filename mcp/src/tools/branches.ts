import { z } from "zod";
import { GraphqlSdk } from "../graphql/client.js";
import { defineTool } from "../types.js";

export interface BranchResult {
    name: string;
    headCommit: {
        hash: string;
        name: string;
        date: string;
    } | null;
}

export async function listBranches(
    sdk: GraphqlSdk,
    search?: string,
): Promise<BranchResult[]> {
    const result = await sdk.FetchBranches();

    let branches = result.branches.map((b) => ({
        name: b.name,
        headCommit: b.tracks
            ? { hash: b.tracks.hash, name: b.tracks.name, date: b.tracks.date }
            : null,
    }));

    if (search) {
        const term = search.toLowerCase();
        branches = branches.filter((b) => b.name.toLowerCase().includes(term));
    }

    return branches;
}

export default defineTool({
    name: "list_branches",
    description:
        "List available OS branches (operating system versions tracked by OSWatcher).",
    schema: {
        search: z
            .string()
            .optional()
            .describe("Case-insensitive substring filter on branch name"),
    },
    handler: (sdk, { search }) => listBranches(sdk, search),
});
