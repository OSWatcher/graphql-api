import { fetch_commit_history, get_commit_capabilities } from "./commits.js";
import { diffTreesIterative } from "./diff/diff.js";
import {
    Commit,
    SearchResult,
    SymbolOptions,
    WinStructOptions,
    DiffNodesOptions,
    DiffItem,
    DiffNodesAtResult,
    CommitHistoryDirection,
} from "./ogm-types.js";
import { get_path_entry } from "./filesystem.js";
import { FSSearchResult, search_fs_fullpath } from "./search.js";
import { fetch_symbols, fetch_structs } from "./fetch.js";
import path from "path";
import { Driver } from "neo4j-driver";
import { OGM } from "@neo4j/graphql-ogm";

export const resolvers = (driver: Driver, _ogm: OGM) => {
    return {
        Query: {
            async fetchCommitHistory(
                _source: unknown,
                args: {
                    commit_hash: string;
                    direction?: CommitHistoryDirection;
                },
            ) {
                const {
                    commit_hash,
                    direction = CommitHistoryDirection.Backward,
                } = args;
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
                {
                    parent_label,
                    base_node_hash,
                    diffee_node_hash,
                    at_path,
                    max_depth,
                    filter,
                    with_intermediates,
                    options,
                }: {
                    parent_label: string;
                    base_node_hash: string;
                    diffee_node_hash: string;
                    at_path: string;
                    max_depth: number | null;
                    filter: Array<string>;
                    with_intermediates: boolean;
                    options: DiffNodesOptions | null;
                },
            ): Promise<DiffNodesAtResult> {
                if (base_node_hash === "" || diffee_node_hash === "") {
                    throw new Error(
                        "Base and diffee node hashes cannot be empty",
                    );
                }
                if (max_depth === null) {
                    max_depth = -1;
                } else if (max_depth && max_depth < 0) {
                    throw new Error("Max depth should be a positive integer");
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
                        max_depth,
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
                args: { commit_hash: string },
            ) {
                const { commit_hash } = args;
                return get_commit_capabilities(driver, commit_hash);
            },
            async traversePath(
                _source: unknown,
                args: { parent_label: string; tree_hash: string; path: string },
            ) {
                const { parent_label, tree_hash, path } = args;
                return await get_path_entry(
                    driver,
                    parent_label,
                    tree_hash,
                    path,
                );
            },
            async search(_source: unknown, args: { search_term: string }) {
                const results: SearchResult[] = [];
                const { search_term } = args;
                for await (const result of search_fs_fullpath(
                    driver,
                    search_term,
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
            async fetchSymbols(
                _source: unknown,
                args: { blob_hash: string; options: SymbolOptions },
            ) {
                const { blob_hash, options } = args;

                return await fetch_symbols(driver, blob_hash, options);
            },
            async fetchStructs(
                _source: unknown,
                args: { blob_hash: string; options: WinStructOptions },
            ) {
                const { blob_hash, options } = args;
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
