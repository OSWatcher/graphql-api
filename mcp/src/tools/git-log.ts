import { z } from "zod";
import { GraphqlSdk } from "../graphql/client.js";
import { Page, offsetPage } from "../pagination.js";
import { defineTool } from "../types.js";

export interface GitLogCommit {
    hash: string;
    name: string;
    date: string;
}

export interface GitLogItem {
    base_commit: GitLogCommit | null;
    diffee_commit: GitLogCommit;
    status: string;
    path: string;
    type: string;
    old_props: { hash: string; properties: unknown } | null;
    new_props: { hash: string; properties: unknown } | null;
}

export interface GitLogParams {
    path: string;
    entity_type: string;
    commit_range: Record<string, unknown>;
    limit?: number;
    offset?: number;
    status_filter?: string[];
    order?: string;
}

export async function gitLog(
    sdk: GraphqlSdk,
    params: GitLogParams,
): Promise<Page<GitLogItem> & { total_count: number }> {
    const offset = params.offset ?? 0;

    const response = await sdk.GitLog({
        path: params.path,
        // The GraphQL argument is named `context`; the tool exposes it as
        // `entity_type`, which is what it actually is.
        context: params.entity_type as any,
        commitRange: params.commit_range as any,
        options: {
            limit: params.limit,
            offset,
            status_filter: params.status_filter as any,
            order: params.order as any,
        },
    });

    const result = response.gitLog;
    const items: GitLogItem[] = result.entries.map((e) => ({
        base_commit: e.base_commit ?? null,
        diffee_commit: e.diffee_commit,
        status: e.diff.status,
        path: e.diff.path,
        type: e.diff.type,
        old_props: e.diff.old_props ?? null,
        new_props: e.diff.new_props ?? null,
    }));

    return {
        ...offsetPage(items, offset, result.has_more),
        total_count: result.total_count,
    };
}

export default defineTool({
    name: "git_log",
    description: `Track how one entity changed across commit history: when it last changed, in which update, and what changed.

This is the "when did this change" tool. Example: git_log(path="/Windows/System32/ntdll.dll", entity_type="FILESYSTEM", commit_range={startRef: "windows_11_24h2"}).

\`entity_type\` selects which graph the path lives in: FILESYSTEM for files and directories, REGISTRY for registry keys, STRUCT or SYMBOL for PDB entities.

\`commit_range\` is the same shape \`search\` takes: {startRef, direction, include_updates, branch, endRef}. startRef is a branch name or a 40-character commit hash; direction defaults to BACKWARD.

An entry with a null base_commit is the entity's first appearance in the traversed history. \`next_cursor\` is the offset for the next page, pass it back as \`offset\`.

Related but different: list_commits tells you which snapshots exist; git_log tells you what changed at a path across them.`,
    schema: {
        path: z
            .string()
            .startsWith("/")
            .describe("Absolute path of the entity to track"),
        entity_type: z
            .enum(["FILESYSTEM", "REGISTRY", "STRUCT", "SYMBOL"])
            .describe("Which graph the path lives in"),
        commit_range: z
            .object({
                startRef: z
                    .string()
                    .min(1)
                    .describe("Branch name or 40-character commit hash"),
                direction: z
                    .enum(["BACKWARD", "FORWARD"])
                    .optional()
                    .describe("Traversal direction (default: BACKWARD)"),
                include_updates: z
                    .boolean()
                    .optional()
                    .describe("Traverse update/patch branches"),
                branch: z
                    .string()
                    .nullish()
                    .describe("Constrain traversal to a tracked branch"),
                endRef: z
                    .string()
                    .nullish()
                    .describe("Commit hash bounding the range"),
            })
            .describe("Commit range to traverse"),
        limit: z
            .number()
            .int()
            .positive()
            .max(500)
            .optional()
            .describe("Entries per page (default: 50)"),
        offset: z
            .number()
            .int()
            .nonnegative()
            .optional()
            .describe(
                "Entries to skip; pass back the previous next_cursor here",
            ),
        status_filter: z
            .array(z.enum(["NEW", "MOD", "DEL", "UNCHANGED"]))
            .optional()
            .describe("Restrict to specific change types"),
        order: z
            .enum(["ASC", "DESC"])
            .optional()
            .describe("DESC = newest first (default), ASC = oldest first"),
    },
    handler: (sdk, params) => gitLog(sdk, params as GitLogParams),
});
