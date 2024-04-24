import { fetch_commit_history, get_commit_capabilities } from "./commits.js";
import { diffTreesRecursive } from "./diff.js";
import { driver, ogm } from "./index.js";
import { Commit } from "./ogm-types.js";
import { get_path_entry } from "./filesystem.js";

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
        async diffCommits(_source, { base_commit_hash, diffee_commit_hash }) {
            // find Commits based on hash
            const Commit = ogm.model("Commit");
            try {
                const arr_commit = await Promise.all(
                    [base_commit_hash, diffee_commit_hash].map(async (hash) => {
                        // select filesystem relationship and get the root Tree hash
                        const selectionSet = `
                        {
                        hash
                        filesystem {
                            hash
                        }
                        }`;
                        return Commit.find({
                            selectionSet,
                            where: {
                                hash,
                            },
                        }).then((result) => {
                            if (!result) {
                                throw new Error(
                                    `Commit hash ${hash} doesn't exists !`
                                );
                            }
                            return result[0];
                        });
                    })
                );
                // get root trees hash
                const [base_root_hash, diffee_root_hash] = arr_commit.map(
                    (com) => com["filesystem"]["hash"]
                );
                // TODO: diff them recursively
                const diff_result = await diffTreesRecursive(
                    driver,
                    "/",
                    base_root_hash,
                    diffee_root_hash
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
