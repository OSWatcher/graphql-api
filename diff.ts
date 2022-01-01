import path from "path";

type DiffObj = {
    path: string;
    type: string;
    old_hash: undefined | string;
    new_hash: undefined | string;
};

const DIFF_QUERY = `
MATCH (t:Tree)-[r:HAS_CHILD_BLOB|HAS_CHILD_TREE]->(c)
WHERE t.hash = $base
    OR t.hash = $diffee
RETURN t.hash as parent_hash, type(r) as type, r.name as name, c.hash as child_hash
`;
// recursive query to fetch all sub blobs under a given Tree
const RECURSIVE_BLOBS_QUERY = `
MATCH path = (t:Tree)-[:HAS_CHILD_BLOB|HAS_CHILD_TREE*]->(b:Blob)
WHERE t.hash = $parent_hash
RETURN [r IN relationships(path) | r.name] as path_parts, b.hash as blob_hash
`;

async function fetchRecusiveBlobs(driver, parent_tree_hash: string) {
    const result = await driver.session().readTransaction((tx) => {
        return tx.run(RECURSIVE_BLOBS_QUERY, { parent_hash: parent_tree_hash });
    });
    /*
    results looks like this:
        path_parts	                                        blob_hash
    1   ["src", "main", "resources", "Unlicense"]           f6067df486cbdbb0aac026b799b26261c92734a3
    2   ["src", "main", "resources", "BSD License"]         d50f85b2ba155047d15ba915158350a18e76b710

    return [
        {
            'rel_path': 'src/main/resources/Unlicense',
            'hash': 'f6067df486cbdbb0aac026b799b26261c92734a3'
        }
    ]
    */
    return result.records.map((current) => {
        const path_parts: Array<string> = current.get("path_parts");
        const blob_hash: string = current.get("blob_hash");
        return {
            rel_path: path.join(...path_parts),
            hash: blob_hash,
        };
    });
}

async function diffTrees(session, base_hash: string, diffee_hash: string) {
    const result = await session.readTransaction((tx) => {
        return tx.run(DIFF_QUERY, { base: base_hash, diffee: diffee_hash });
    });
    // reduce records into a map
    // {
    //      base_hash: {
    //          filename1: {item metadata},
    //          ...
    //      },
    //      diffee_hash: {
    //      }
    //
    // }
    const map_records = result.records.reduce(
        (prev, current) => {
            const parent_hash = current.get("parent_hash");
            const type = current.get("type");
            const name = current.get("name");
            const child_hash = current.get("child_hash");
            prev[parent_hash][name] = {
                type: type,
                hash: child_hash,
            };
            return prev;
        },
        // intial value
        {
            [base_hash]: {},
            [diffee_hash]: {},
        }
    );
    const map_base = map_records[base_hash];
    const map_diffee = map_records[diffee_hash];
    // compute diff
    const diff_tree_result = {
        newitems: {},
        delitems: {},
        moditems: {},
    };
    const base_filename_arr = Object.keys(map_base);
    const diffee_filename_arr = Object.keys(map_diffee);
    // extract newitems
    // filename dans diffee NOT IN base
    for (const new_name of diffee_filename_arr.filter(
        (x) => !base_filename_arr.includes(x)
    )) {
        diff_tree_result["newitems"][new_name] = map_diffee[new_name];
    }
    // extract delitems
    // filename dans base NOT IN diffee
    for (const del_name of base_filename_arr.filter(
        (x) => !diffee_filename_arr.includes(x)
    )) {
        diff_tree_result["delitems"][del_name] = map_base[del_name];
    }
    // modified items
    // filename present in both maps, but child hash is !=
    for (const same_name of diffee_filename_arr.filter((x) =>
        base_filename_arr.includes(x)
    )) {
        if (map_diffee[same_name]["hash"] != map_base[same_name]["hash"]) {
            diff_tree_result["moditems"][same_name] = {
                type: map_base[same_name]["type"],
                old_hash: map_base[same_name]["hash"],
                new_hash: map_diffee[same_name]["hash"],
            };
        }
    }
    return diff_tree_result;
}

async function diffTreesRecursive(
    driver,
    current_path: string,
    base_hash: string,
    diffee_hash: string
) {
    // result
    const diff_rec_result: {
        newitems_path: unknown[];
        delitems_path: unknown[];
        moditems_path: unknown[];
    } = {
        newitems_path: [],
        delitems_path: [],
        moditems_path: [],
    };
    // one transaction per session is allowed
    // so we need one session per diffTreesRecursive call
    const session = driver.session();
    const diff_result = await diffTrees(session, base_hash, diffee_hash);

    // process new
    //      partition newitems between blobs and trees
    const [new_diff_blobs_arr, new_diff_trees_arr] = Object.keys(
        diff_result["newitems"]
    ).reduce(
        (result: DiffObj[][], name: string) => {
            const new_item = diff_result["newitems"][name];
            const diff_obj = {
                path: path.join(current_path, name),
                type: new_item["type"] == "HAS_CHILD_BLOB" ? "Blob" : "Tree",
                old_hash: undefined,
                new_hash: new_item["hash"],
            };
            console.log("NEW: " + diff_obj["path"]);
            result[diff_obj["type"] == "Blob" ? 0 : 1].push(diff_obj);
            return result;
        },
        [[], []]
    );
    //      push new blobs
    diff_rec_result["newitems_path"].push(...new_diff_blobs_arr);
    //      fetch sub blobs for each new directory, parallelize with Promise.all
    const new_subblobs_arr = await Promise.all(
        new_diff_trees_arr.map((diff_obj) =>
            // TODO; typescript quick fix
            fetchRecusiveBlobs(driver, diff_obj["new_hash"] || "")
        )
    );
    new_subblobs_arr.reduce(
        (result, subblob_arr, currentIndex) =>
            result.push(
                ...subblob_arr.map((subblob) => {
                    const diff_obj = new_diff_trees_arr[currentIndex];
                    const new_path = path.join(
                        diff_obj["path"],
                        subblob["rel_path"]
                    );
                    console.log(`NEW: ${new_path}`);
                    return {
                        path: new_path,
                        type: "Blob",
                        old_hash: undefined,
                        new_hash: subblob["hash"],
                    };
                })
            ),
        diff_rec_result["newitems_path"]
    );

    // process deleted
    //      partition
    const [del_diff_blobs_arr, del_diff_trees_arr] = Object.keys(
        diff_result["delitems"]
    ).reduce(
        (result: DiffObj[][], name: string) => {
            const del_item = diff_result["delitems"][name];
            const diff_obj = {
                path: path.join(current_path, name),
                type: del_item["type"] == "HAS_CHILD_BLOB" ? "Blob" : "Tree",
                old_hash: del_item["hash"],
                new_hash: undefined,
            };
            console.log("DEL: " + diff_obj["path"]);
            result[diff_obj["type"] == "Blob" ? 0 : 1].push(diff_obj);
            return result;
        },
        [[], []]
    );
    //      push del blobs
    diff_rec_result["delitems_path"].push(...del_diff_blobs_arr);
    //      fetch sub blobs for each new directory, parallelize with Promise.all
    const del_subblobs_arr = await Promise.all(
        del_diff_trees_arr.map((diff_obj) =>
            // TODO; typescript quick fix
            fetchRecusiveBlobs(driver, diff_obj["old_hash"] || "")
        )
    );
    del_subblobs_arr.reduce(
        (result, subblob_arr, currentIndex) =>
            result.push(
                ...subblob_arr.map((subblob) => {
                    const diff_obj = del_diff_trees_arr[currentIndex];
                    const new_path = path.join(
                        diff_obj["path"],
                        subblob["rel_path"]
                    );
                    console.log(`DEL: ${new_path}`);
                    return {
                        path: new_path,
                        type: "Blob",
                        old_hash: subblob["hash"],
                        new_hash: undefined,
                    };
                })
            ),
        diff_rec_result["delitems_path"]
    );

    // process modfied items
    // use Promise.all to process them in parallel
    //      build diff_obj first for all items
    const mod_diff_obj_arr = Object.keys(diff_result["moditems"]).map(function (
        name
    ) {
        const item = diff_result["moditems"][name];
        const diff_obj = {
            path: path.join(current_path, name),
            type: item["type"] == "HAS_CHILD_BLOB" ? "Blob" : "Tree",
            old_hash: item["old_hash"],
            new_hash: item["new_hash"],
        };
        console.log("MOD: " + diff_obj["path"]);
        return diff_obj;
    });
    //      loop on diff obj array, for each Blob, push to diff_rec_result
    diff_rec_result["moditems_path"].push(
        ...mod_diff_obj_arr.filter((diff_obj) => diff_obj["type"] == "Blob")
    );
    //      loop on diff obj array, and for each Tree, parallel diffTreesRecursive execution
    const sub_diff_result_arr = await Promise.all(
        mod_diff_obj_arr
            .filter((diff_obj) => diff_obj["type"] == "Tree")
            .map((diff_obj) =>
                diffTreesRecursive(
                    driver,
                    diff_obj["path"],
                    diff_obj["old_hash"],
                    diff_obj["new_hash"]
                )
            )
    );
    //      merge results
    sub_diff_result_arr.map((sub_diff_result) => {
        diff_rec_result["newitems_path"].push(
            ...sub_diff_result["newitems_path"]
        );
        diff_rec_result["delitems_path"].push(
            ...sub_diff_result["delitems_path"]
        );
        diff_rec_result["moditems_path"].push(
            ...sub_diff_result["moditems_path"]
        );
    });
    session.close();
    return diff_rec_result;
}

export { diffTreesRecursive };
