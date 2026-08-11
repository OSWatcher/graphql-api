import {
    fetch_commit_history,
    get_commit_capabilities,
    get_blobs_with_symbols,
} from "./commits.js";
import { diffNodesAtInternal } from "./diff/diff.js";
import {
    Commit,
    SearchResult,
    DiffItem,
    DiffNodesAtResult,
    CommitHistoryDirection,
    GitLogResult,
} from "./ogm-types.js";
import { get_path_entry } from "./filesystem.js";
import { search } from "./search.js";
import { git_log, git_log_stream } from "./git-log/index.js";
import { Driver } from "neo4j-driver";
import { OGM } from "@neo4j/graphql-ogm";
import {
    SearchInputSchema,
    FetchCommitHistoryArgsSchema,
    TraversePathArgsSchema,
    DiffNodesArgsSchema,
    GetCommitCapabilitiesArgsSchema,
    GetBlobsWithSymbolsArgsSchema,
    GitLogArgsSchema,
} from "./validation.js";

export const resolvers = (driver: Driver, _ogm: OGM) => {
    return {
        Subscription: {
            searchStream: {
                subscribe: async function* (
                    _source: unknown,
                    args: unknown,
                    _context: any,
                ) {
                    // Validate input
                    const argsObj = args as { input: any };
                    const input = SearchInputSchema.parse(argsObj.input);

                    // Stream results from Neo4j
                    for await (const result of search(driver, input)) {
                        // Wrap each result in subscription envelope
                        yield {
                            searchStream: result,
                        };
                    }
                },
            },
            gitLogStream: {
                subscribe: async function* (
                    _source: unknown,
                    args: unknown,
                    _context: any,
                ) {
                    // Validate input
                    const validatedArgs = GitLogArgsSchema.parse(args);
                    const {
                        path,
                        context: entity_type,
                        commit_range,
                        options,
                    } = validatedArgs;

                    // Stream results from git_log_stream
                    for await (const entry of git_log_stream(
                        driver,
                        path,
                        entity_type,
                        commit_range,
                        options,
                    )) {
                        yield { gitLogStream: entry };
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
                _context: any,
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

                // Convert null max_depth to -1 (unlimited)
                const resolvedMaxDepth =
                    max_depth === null || max_depth === undefined
                        ? -1
                        : max_depth;
                if (resolvedMaxDepth < -1) {
                    throw new Error(
                        "Max depth should be -1 (unlimited), 0 (node comparison), or a positive integer",
                    );
                }

                // Convert DiffStatus enum values to strings for Neo4j procedure
                const status_filter =
                    options?.status_filter?.map((s) => String(s)) ?? [];

                try {
                    return await diffNodesAtInternal(driver, {
                        parent_label,
                        base_node_hash,
                        diffee_node_hash,
                        at_path,
                        max_depth: resolvedMaxDepth,
                        filter,
                        with_intermediates,
                        options: {
                            limit: options?.limit,
                            offset: options?.offset,
                            status_filter,
                        },
                    });
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
                const result = await get_path_entry(
                    driver,
                    parent_label,
                    tree_hash,
                    path,
                );
                return result?.hash ?? null;
            },
            async getBlobsWithSymbols(_source: unknown, args: unknown) {
                const validatedArgs = GetBlobsWithSymbolsArgsSchema.parse(args);
                const { commit_hash } = validatedArgs;
                return get_blobs_with_symbols(driver, commit_hash);
            },
            async search(_source: unknown, args: unknown, _context: any) {
                // Validate input
                const argsObj = args as { input: any };
                const input = SearchInputSchema.parse(argsObj.input);

                const results: SearchResult[] = [];
                for await (const result of search(driver, input)) {
                    results.push(result);
                }
                return results;
            },
            async gitLog(
                _source: unknown,
                args: unknown,
                _context: any,
            ): Promise<GitLogResult> {
                // Validate input
                const validatedArgs = GitLogArgsSchema.parse(args);
                const {
                    path,
                    context: entity_type,
                    commit_range,
                    options,
                } = validatedArgs;

                return await git_log(
                    driver,
                    path,
                    entity_type,
                    commit_range,
                    options,
                );
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
        StructField: {
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
