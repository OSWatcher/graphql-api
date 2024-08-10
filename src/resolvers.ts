import { fetch_commit_history, get_commit_capabilities } from "./commits.js";
import { diffTreesIterative } from "./diff/diff.js";
import { DiffStatus, DiffResult, NodeType, DiffObj } from "./diff/types.js";
import {
    Commit,
    SearchResult,
    TreeCreateInput,
    FsNodeType,
} from "./ogm-types.js";
import { get_path_entry } from "./filesystem.js";
import { FSSearchResult, search_fs_fullpath } from "./search.js";
import path from "path";
import { Driver } from "neo4j-driver";
import { OGM } from "@neo4j/graphql-ogm";

export const resolvers = (driver: Driver, ogm: OGM) => {
    //
    // utils functions utils functions
    async function getTreeHashFromCommit(commitHash: string) {
        const Commit = ogm.model("Commit");
        const selectionSet = `
    {
        hash
        filesystem {
            hash
        }
    }`;

        const result = await Commit.find({
            selectionSet,
            where: {
                hash: commitHash,
            },
        });

        if (!result || result.length === 0) {
            throw new Error(`Commit hash ${commitHash} doesn't exist!`);
        }

        return result[0].filesystem.hash;
    }

    return {
        Query: {
            async fetchCommitHistory(
                _source: unknown,
                args: { branch_name: string }
            ) {
                const { branch_name } = args;
                const results: Commit[] = [];
                for await (const commit of fetch_commit_history(
                    driver,
                    branch_name
                )) {
                    results.push(commit);
                }
                return results;
            },
            async diffCommitsAt(
                _source: unknown,
                {
                    base_commit_hash,
                    diffee_commit_hash,
                    at_path,
                    max_depth,
                }: {
                    base_commit_hash: string;
                    diffee_commit_hash: string;
                    at_path: string;
                    max_depth: number | null | undefined;
                }
            ) {
                // max_depth undefined ?
                if (max_depth === undefined) {
                    max_depth = null;
                } else if (max_depth && max_depth < 0) {
                    throw new Error("Max depth should be a positive integer");
                }
                // find Commits based on hash
                try {
                    // filesystem root hash from commits
                    const [base_root_hash, diffee_root_hash] =
                        await Promise.all([
                            getTreeHashFromCommit(base_commit_hash),
                            getTreeHashFromCommit(diffee_commit_hash),
                        ]);

                    // traverse the given path on both filesystems with get_path_entry()
                    const [base_entry_at, diffee_entry_at] = await Promise.all([
                        get_path_entry(driver, base_root_hash, at_path),
                        get_path_entry(driver, diffee_root_hash, at_path),
                    ]);

                    const diff_result: DiffResult = {
                        newitems: [],
                        delitems: [],
                        moditems: [],
                    };

                    for await (const diff_obj of diffTreesIterative(
                        driver,
                        at_path,
                        base_entry_at,
                        diffee_entry_at,
                        max_depth
                    )) {
                        switch (diff_obj.status) {
                            case DiffStatus.NEW:
                                diff_result.newitems.push({
                                    ...diff_obj,
                                    path: path.relative(at_path, diff_obj.path),
                                });
                                break;
                            case DiffStatus.DEL:
                                diff_result.delitems.push({
                                    ...diff_obj,
                                    path: path.relative(at_path, diff_obj.path),
                                });
                                break;
                            case DiffStatus.MOD:
                                diff_result.moditems.push({
                                    ...diff_obj,
                                    path: path.relative(at_path, diff_obj.path),
                                });
                                break;
                        }
                    }

                    return diff_result;
                } catch (error) {
                    console.error("Error in diffCommits: ", error);
                    throw new Error(
                        "An error occurred while processing the request."
                    );
                }
            },
            async getCommitExtractedDataLabels(
                _source: unknown,
                args: { commit_hash: string }
            ) {
                const { commit_hash } = args;
                return get_commit_capabilities(driver, commit_hash);
            },
            async traversePath(
                _source: unknown,
                args: { tree_hash: string; path: string }
            ) {
                const { tree_hash, path } = args;
                return await get_path_entry(driver, tree_hash, path);
            },
            async search(_source: unknown, args: { search_term: string }) {
                const results: SearchResult[] = [];
                const { search_term } = args;
                for await (const result of search_fs_fullpath(
                    driver,
                    search_term
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
        },
        Mutation: {
            async mergeTree(
                _source: unknown,
                args: { input: TreeCreateInput }
            ) {
                const { input } = args;

                // Add assertion for input
                if (input === null || input === undefined) {
                    throw new Error("Input cannot be null or undefined");
                }

                const session = driver.session();
                const prom = session.executeWrite((tx) => {
                    // merge parent tree
                    tx.run("MERGE (parent:Tree {hash: $hash})", {
                        hash: input["hash"],
                    });

                    if (
                        input["child_blobs"] &&
                        input["child_blobs"]["create"]
                    ) {
                        // merge blobs with relationships
                        tx.run(
                            `
                        MATCH (p:Tree {hash: $parent_hash})
                        WITH p
                        UNWIND $unwind_param as rel
                        MERGE (c:Blob {hash: rel.node.hash})
                        MERGE (p)-[:HAS_CHILD_BLOB {name: rel.edge.name}]->(c)
                    `,
                            {
                                parent_hash: input["hash"],
                                unwind_param: input["child_blobs"]["create"],
                            }
                        );
                    }

                    if (
                        input["child_trees"] &&
                        input["child_trees"]["create"]
                    ) {
                        // merge trees with relationships
                        tx.run(
                            `
                        MATCH (p:Tree {hash: $parent_hash})
                        WITH p
                        UNWIND $unwind_param as rel
                        MERGE (c:Tree {hash: rel.node.hash})
                        MERGE (p)-[:HAS_CHILD_TREE {name: rel.edge.name}]->(c)
                    `,
                            {
                                parent_hash: input["hash"],
                                unwind_param: input["child_trees"]["create"],
                            }
                        );
                    }
                });
                try {
                    await prom;
                } catch (error) {
                    console.log(error);
                } finally {
                    session.close();
                }
                return "hello";
            },
        },
        DiffResult: {
            newitems: (
                parent: DiffResult,
                _args: unknown,
                _context: unknown
            ) => {
                return parent["newitems"];
            },
            delitems: (
                parent: DiffResult,
                _args: unknown,
                _context: unknown
            ) => {
                return parent["delitems"];
            },
            moditems: (
                parent: DiffResult,
                _args: unknown,
                _context: unknown
            ) => {
                return parent["moditems"];
            },
        },
        // custom resolver for type to translate typescript integer enum into string values
        DiffItem: {
            type: (parent: DiffObj) => {
                switch (parent.type) {
                    case NodeType.Blob:
                        return FsNodeType.Blob;
                    case NodeType.Tree:
                        return FsNodeType.Tree;
                    default:
                        throw new Error(`Invalid NodeType: ${parent.type}`);
                }
            },
        },
    };
};
