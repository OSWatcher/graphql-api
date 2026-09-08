import { GraphqlSdk } from "../graphql/client.js";

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
