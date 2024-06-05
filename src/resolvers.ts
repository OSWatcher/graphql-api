import { fetch_commit_history, get_commit_capabilities } from "./commits.js";
import { diffTreesRecursive } from "./diff.js";
import { driver, ogm } from "./index.js";
import { Commit, SearchResult } from "./ogm-types.js";
import { get_path_entry } from "./filesystem.js";
import { FSSearchResult, search_fs_fullpath } from "./search.js";

// utils functions
async function getTreeHashFromCommit(commitHash) {
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

const resolvers = {
    Query: {
        async fetchCommitHistory(_source, { branch_name }) {
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
            _source,
            {
                base_commit_hash,
                diffee_commit_hash,
                path,
                max_depth,
            }: {
                base_commit_hash: string;
                diffee_commit_hash: string;
                path: string;
                max_depth: number | null;
            }
        ) {
            if (max_depth && max_depth < 0) {
                throw new Error("Max depth should be a positive integer");
            }
            // find Commits based on hash
            try {
                // filesystem root hash from commits
                const [base_root_hash, diffee_root_hash] = await Promise.all([
                    getTreeHashFromCommit(base_commit_hash),
                    getTreeHashFromCommit(diffee_commit_hash),
                ]);

                // traverse the given path on both filesystems with get_path_entry()
                const [base_entry_at, diffee_entry_at] = await Promise.all([
                    get_path_entry(driver, base_root_hash, path),
                    get_path_entry(driver, diffee_root_hash, path),
                ]);

                const diff_result = await diffTreesRecursive(
                    driver,
                    path,
                    base_entry_at,
                    diffee_entry_at,
                    max_depth
                );

                return {
                    newitems: diff_result["newitems_path"],
                    delitems: diff_result["delitems_path"],
                    moditems: diff_result["moditems_path"],
                };
            } catch (error) {
                console.error("Error in diffCommits: ", error);
                throw new Error(
                    "An error occurred while processing the request."
                );
            }
        },
        async getCommitExtractedDataLabels(_source, { commit_hash }) {
            return get_commit_capabilities(driver, commit_hash);
        },
        async traversePath(_source, { tree_hash, path }) {
            return await get_path_entry(driver, tree_hash, path);
        },
        async search(_source, { search_term }) {
            const results: SearchResult[] = [];
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
        async mergeTree(_source, { input }) {
            const session = driver.session();
            const prom = session.executeWrite((tx) => {
                // merge parent tree
                tx.run("MERGE (parent:Tree {hash: $hash})", {
                    hash: input["hash"],
                });
                if ("child_blobs" in input) {
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
                if ("child_trees" in input) {
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
        newitems: (parent, _args, _context) => {
            return parent["newitems"];
        },
        delitems: (parent, _args, _context) => {
            return parent["delitems"];
        },
        moditems: (parent, _args, _context) => {
            return parent["moditems"];
        },
    },
};

export { resolvers };
