import { fetch_commit_history, get_commit_capabilities } from "./commits.js";
import { diffTreesIterative } from "./diff/diff.js";
import {
    Commit,
    SearchResult,
    DiffItem,
    DiffNodesAtResult,
    CommitHistoryDirection,
} from "./ogm-types.js";
import { get_path_entry } from "./filesystem.js";
import { FSSearchResult, search_fs_fullpath } from "./search.js";
import { fetch_symbols, fetch_structs } from "./fetch.js";
import path from "path";
import { Driver } from "neo4j-driver";
import neo4j, { DateTime } from "neo4j-driver";
import { OGM } from "@neo4j/graphql-ogm";
import {
    SearchArgsSchema,
    FetchCommitHistoryArgsSchema,
    TraversePathArgsSchema,
    DiffNodesArgsSchema,
    FetchSymbolsArgsSchema,
    FetchStructsArgsSchema,
    GetCommitCapabilitiesArgsSchema,
} from "./validation.js";
import { GET_NODE_COMMIT_DATES } from "./queries.js";

type CommitDateRecord = {
    date: DateTime;
};

/**
 * Check if a node is allowed by the date limit
 * Returns true if at least one commit containing the node is from limitYear or older
 */
async function isNodeAllowedByDateLimit(
    driver: Driver,
    nodeHash: string,
    parentLabel: string,
    limitYear: number,
): Promise<boolean> {
    // Tree nodes don't need date checking
    if (parentLabel === "Tree") {
        return true;
    }

    const session = driver.session();
    try {
        const query = GET_NODE_COMMIT_DATES(parentLabel);
        const result = await session.executeRead(async (tx) => {
            return tx.run<CommitDateRecord>(query, { node_hash: nodeHash });
        });

        if (result.records.length === 0) {
            console.warn(
                `No commit found for ${parentLabel} node: ${nodeHash}`,
            );
            // Fail-open: if no commits found, allow the diff
            return true;
        }

        // Extract all commit dates as Neo4j DateTime objects
        const dates: DateTime[] = result.records
            .map((record) => {
                const { date } = record.toObject() as CommitDateRecord;

                // Runtime safety: verify the type is really a DateTime
                if (!neo4j.isDateTime(date)) {
                    console.error(
                        `Unexpected type for commit date on node ${nodeHash}:`,
                        date,
                    );
                    // Be conservative: treat this commit as not allowed
                    return null as unknown as DateTime;
                }

                return date;
            })
            .filter((d) => d !== null);

        // console.log(
        //     `Date check for ${parentLabel} node ${nodeHash}: found ${dates.length} commits with dates: ${dates.join(", ")}`,
        // );

        // Check if AT LEAST ONE commit is from limitYear or older (earlier/equal)
        // Example: limitYear=2020, commits=[2018,2019,2021] → Allow (2018<=2020)
        const hasAllowedCommit = dates.some((dateTime) => {
            // dateTime.year is a Neo4j Integer
            const year = dateTime.year.toNumber();
            const allowed = year <= limitYear;

            console.log(
                `  Commit date: ${dateTime.toString()} (year: ${year}) - ${
                    allowed ? "ALLOWED" : "BLOCKED"
                } (limit: ${limitYear})`,
            );

            return allowed;
        });

        // console.log(
        //     `Date check result for ${parentLabel} node ${nodeHash}: ${hasAllowedCommit ? "ALLOWED" : "BLOCKED"
        //     }`,
        // );

        return hasAllowedCommit;
    } catch (error) {
        console.error(
            `Error fetching commit dates for node ${nodeHash}:`,
            error,
        );
        // Fail-open: on error, allow the diff
        return true;
    } finally {
        await session.close();
    }
}

export const resolvers = (driver: Driver, _ogm: OGM, env: any) => {
    return {
        Subscription: {
            searchStream: {
                subscribe: async function* (_source: unknown, args: unknown) {
                    // Validate input
                    const validatedArgs = SearchArgsSchema.parse(args);
                    const { commit_range, search_term } = validatedArgs;

                    // Pure functional core - stream results from Neo4j
                    for await (const result of search_fs_fullpath(
                        driver,
                        search_term,
                        commit_range,
                    ) as AsyncGenerator<FSSearchResult>) {
                        // Wrap each result in subscription envelope
                        yield {
                            searchStream: {
                                commit_name: result.commit_name,
                                commit_hash: result.commit_hash,
                                hash: result.blob_hash,
                                path: result.full_path,
                            },
                        };
                    }
                },
            },
        },
        Query: {
            async fetchCommitHistory(_source: unknown, args: unknown) {
                // Validate input
                const validatedArgs = FetchCommitHistoryArgsSchema.parse(args);
                const {
                    commit_hash,
                    direction = CommitHistoryDirection.Backward,
                } = validatedArgs;

                const results: Commit[] = [];
                for await (const commit of fetch_commit_history(
                    driver,
                    commit_hash,
                    direction,
                )) {
                    results.push(commit);
                }
                return results;
            },
            async diffNodesAt(
                _source: unknown,
                args: unknown,
                context: any,
            ): Promise<DiffNodesAtResult> {
                // Validate input
                const validatedArgs = DiffNodesArgsSchema.parse(args);
                const {
                    parent_label,
                    base_node_hash,
                    diffee_node_hash,
                    at_path,
                    max_depth,
                    filter,
                    with_intermediates,
                    options,
                } = validatedArgs;
                if (base_node_hash === "" || diffee_node_hash === "") {
                    throw new Error(
                        "Base and diffee node hashes cannot be empty",
                    );
                }
                // Restrict recursive diffing to authenticated users only
                // max_depth === 0 means non-recursive (single level) - allowed for all
                // Any other value (including null/undefined) requires authentication
                if (max_depth !== 0 && !context.jwt) {
                    console.warn(
                        `Recursive diff denied: Unauthenticated request with max_depth=${max_depth}`,
                    );
                    throw new Error(
                        "Recursive diffing requires authentication. Please provide a valid JWT token.",
                    );
                }

                if (!context.jwt) {
                    // Date-based restriction for non-filesystem diffs and unauthenticated users
                    // Check both base and diffee nodes - BOTH must have at least one commit <= limitYear
                    if (parent_label !== "Tree") {
                        const [baseAllowed, diffeeAllowed] = await Promise.all([
                            isNodeAllowedByDateLimit(
                                driver,
                                base_node_hash,
                                parent_label,
                                env.DIFF_DATE_LIMIT_YEAR,
                            ),
                            isNodeAllowedByDateLimit(
                                driver,
                                diffee_node_hash,
                                parent_label,
                                env.DIFF_DATE_LIMIT_YEAR,
                            ),
                        ]);

                        if (!baseAllowed) {
                            console.warn(
                                `Date-limited diff denied: base node (${parent_label}: ${base_node_hash}) ` +
                                    `has no commits from ${env.DIFF_DATE_LIMIT_YEAR} or older`,
                            );
                            throw new Error(
                                `Diff operations for ${parent_label} nodes from commits ` +
                                    `after ${env.DIFF_DATE_LIMIT_YEAR} are not available.`,
                            );
                        }

                        if (!diffeeAllowed) {
                            console.warn(
                                `Date-limited diff denied: diffee node (${parent_label}: ${diffee_node_hash}) ` +
                                    `has no commits from ${env.DIFF_DATE_LIMIT_YEAR} or older`,
                            );
                            throw new Error(
                                `Diff operations for ${parent_label} nodes from commits ` +
                                    `after ${env.DIFF_DATE_LIMIT_YEAR} are not available.`,
                            );
                        }
                    }
                }

                // Convert null max_depth to -1 (unlimited)
                const resolvedMaxDepth =
                    max_depth === null || max_depth === undefined
                        ? -1
                        : max_depth;
                if (resolvedMaxDepth < -1) {
                    throw new Error(
                        "Max depth should be -1 (unlimited) or a positive integer",
                    );
                }
                try {
                    // traverse the given path on both filesystems with get_path_entry()
                    const [base_entry_at, diffee_entry_at] = await Promise.all([
                        get_path_entry(
                            driver,
                            parent_label,
                            base_node_hash,
                            at_path,
                        ),
                        get_path_entry(
                            driver,
                            parent_label,
                            diffee_node_hash,
                            at_path,
                        ),
                    ]);

                    const diff_nodes_at_result: DiffNodesAtResult = {
                        total_count: 0,
                        items: [],
                    };
                    let skipped = 0;
                    let added = 0;
                    const limit = options?.limit ?? Infinity;
                    const offset = options?.offset ?? 0;

                    for await (const diff_obj of diffTreesIterative(
                        driver,
                        parent_label,
                        at_path,
                        base_entry_at,
                        diffee_entry_at,
                        resolvedMaxDepth,
                        filter,
                        with_intermediates,
                    )) {
                        if (skipped < offset) {
                            skipped++;
                            diff_nodes_at_result.total_count++;
                            continue;
                        }

                        if (added < limit) {
                            diff_nodes_at_result.items.push({
                                ...diff_obj,
                                path: path.relative(at_path, diff_obj.path),
                            });
                            added++;
                        }
                        diff_nodes_at_result.total_count++;
                    }

                    return diff_nodes_at_result;
                } catch (error) {
                    console.error("Error in diffCommits: ", error);
                    throw new Error(
                        "An error occurred while processing the request.",
                    );
                }
            },
            async getCommitExtractedDataLabels(
                _source: unknown,
                args: unknown,
            ) {
                // Validate input
                const validatedArgs =
                    GetCommitCapabilitiesArgsSchema.parse(args);
                const { commit_hash } = validatedArgs;
                return get_commit_capabilities(driver, commit_hash);
            },
            async traversePath(_source: unknown, args: unknown) {
                // Validate input
                const validatedArgs = TraversePathArgsSchema.parse(args);
                const { parent_label, tree_hash, path } = validatedArgs;
                return await get_path_entry(
                    driver,
                    parent_label,
                    tree_hash,
                    path,
                );
            },
            async search(_source: unknown, args: unknown) {
                // Validate input
                const validatedArgs = SearchArgsSchema.parse(args);
                const { commit_range, search_term } = validatedArgs;

                const results: SearchResult[] = [];
                for await (const result of search_fs_fullpath(
                    driver,
                    search_term,
                    commit_range,
                ) as AsyncGenerator<FSSearchResult>) {
                    results.push({
                        commit_name: result.commit_name,
                        commit_hash: result.commit_hash,
                        hash: result.blob_hash,
                        path: result.full_path,
                    });
                }
                return results;
            },
            async fetchSymbols(_source: unknown, args: unknown) {
                // Validate input
                const validatedArgs = FetchSymbolsArgsSchema.parse(args);
                const { blob_hash, options } = validatedArgs;

                return await fetch_symbols(driver, blob_hash, options);
            },
            async fetchStructs(_source: unknown, args: unknown) {
                // Validate input
                const validatedArgs = FetchStructsArgsSchema.parse(args);
                const { blob_hash, options } = validatedArgs;
                return await fetch_structs(driver, blob_hash, options);
            },
        },
        DiffItem: {
            old_props: (parent: DiffItem) => {
                if (!parent.old_props) return null;

                const { hash, ...properties } = parent.old_props;
                return {
                    hash,
                    properties: properties as Record<string, unknown>,
                };
            },
            new_props: (parent: DiffItem) => {
                if (!parent.new_props) return null;

                const { hash, ...properties } = parent.new_props;
                return {
                    hash,
                    properties: properties as Record<string, unknown>,
                };
            },
        },
        WinStructField: {
            data_type: (parent: { data_type: string }) => {
                try {
                    return JSON.parse(parent.data_type);
                } catch (error) {
                    console.error("Error parsing data_type JSON:", error);
                    return null; // or return an empty object {} if you prefer
                }
            },
        },
    };
};
