import { Driver, Session } from "neo4j-driver";
import path from "path";

type DiffObj = {
    // status of the diff (NEW / MOD / DEL)
    status: DiffStatus;
    type: NodeType;
    // object path. If relative the it refer to the filename only
    path: string;
    // old and new hash values, defined depending on the DiffStatus
    // depends on status
    // NEW: new_hash is defined
    // DEL: old_hash is defined
    // MOD: both hashes are defined
    old_hash: undefined | string;
    new_hash: undefined | string;
};

enum NodeType {
    Blob,
    Tree,
}

enum DiffStatus {
    NEW,
    MOD,
    DEL,
}

// helpers
function getNodeTypeFromRel(relationship: string): NodeType {
    switch (relationship) {
        case "HAS_CHILD_BLOB":
            return NodeType.Blob;
        case "HAS_CHILD_TREE":
            return NodeType.Tree;
        default:
            throw Error(`Unexpected relationship ${relationship}`);
    }
}

type ComputeDiffMapType = Record<string, Record<string, NodeType | string>>;

function* computeDifferences(
    mapA: ComputeDiffMapType,
    mapB: ComputeDiffMapType,
    status: DiffStatus
): IterableIterator<DiffObj> {
    if (status == DiffStatus.MOD) {
        for (const [key, value] of Object.entries(mapA)) {
            if (key in mapB) {
                // check != hashes
                if (value["hash"] != mapB[key]["hash"]) {
                    const diff_obj: DiffObj = {
                        status: status,
                        type: value["type"] as NodeType,
                        path: key,
                        old_hash: mapA[key]["hash"] as string,
                        new_hash: mapB[key]["hash"] as string,
                    };
                    yield diff_obj;
                }
            }
        }
    } else {
        for (const [key, value] of Object.entries(mapA)) {
            if (!(key in mapB)) {
                // build DiffObj
                const diff_obj: DiffObj = {
                    status: status,
                    type: value["type"] as NodeType,
                    path: key as string,
                    old_hash:
                        status == DiffStatus.DEL
                            ? (value["hash"] as string)
                            : undefined,
                    new_hash:
                        status == DiffStatus.NEW
                            ? (value["hash"] as string)
                            : undefined,
                };
                yield diff_obj;
            }
        }
    }
}

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

async function fetchRecusiveBlobs(
    driver: Driver,
    parent_tree_hash: string,
    status: DiffStatus
): Promise<DiffObj[]> {
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
        const diff_obj: DiffObj = {
            status: status,
            path: path.join(...path_parts),
            type: NodeType.Blob,
            old_hash: status == DiffStatus.DEL ? blob_hash : undefined,
            new_hash: status == DiffStatus.NEW ? blob_hash : undefined,
        };
        return diff_obj;
    });
}

async function diffTrees(
    session: Session,
    base_hash: string,
    diffee_hash: string
): Promise<Map<DiffStatus, DiffObj[]>> {
    const result = await session.readTransaction((tx) => {
        return tx.run(DIFF_QUERY, { base: base_hash, diffee: diffee_hash });
    });
    // reduce records into a map
    // {
    //      base_hash: {
    //          filename1: {
    //              'type': ''HAS_CHILD_BLOB' | 'HASH_CHILD_TREE'
    //              'hash': d86xxxxx
    //            },
    //      },
    //      diffee_hash: {
    //      }
    //
    // }
    const map_records: Record<string, ComputeDiffMapType> = {
        [base_hash]: {},
        [diffee_hash]: {},
    };

    // base_hash == parent_hash

    result.records.forEach((record) => {
        const parent_hash = record.get("parent_hash");
        const name = record.get("name");
        const rel = record.get("type");
        const child_hash = record.get("child_hash");

        map_records[parent_hash][name] = {
            type: getNodeTypeFromRel(rel),
            hash: child_hash,
        };
    });

    const map_base = map_records[base_hash];
    const map_diffee = map_records[diffee_hash];
    // compute diff
    const diff_tree_result = new Map<DiffStatus, DiffObj[]>([
        [DiffStatus.NEW, []],
        [DiffStatus.MOD, []],
        [DiffStatus.DEL, []],
    ]);

    const new_iter = computeDifferences(map_diffee, map_base, DiffStatus.NEW);
    const del_iter = computeDifferences(map_base, map_diffee, DiffStatus.DEL);
    const mod_iter = computeDifferences(map_base, map_diffee, DiffStatus.MOD);

    // push results
    diff_tree_result.get(DiffStatus.NEW)!.push(...new_iter);
    diff_tree_result.get(DiffStatus.DEL)!.push(...del_iter);
    diff_tree_result.get(DiffStatus.MOD)!.push(...mod_iter);
    return diff_tree_result;
}

function partition_blobs(diff_result: DiffObj[]): [DiffObj[], DiffObj[]] {
    return diff_result.reduce(
        (acc: [DiffObj[], DiffObj[]], current: DiffObj) => {
            // push into array index 0 or 1 based on type
            acc[current.type == NodeType.Blob ? 0 : 1].push(current);
            return acc;
        },
        // initial value
        [[], []]
    );
}

async function* diffTreesRecursive(
    driver,
    current_path: string,
    base_hash: string,
    diffee_hash: string
): AsyncGenerator<DiffObj, void, void> {
    // result
    const diff_rec_result: {
        newitems_path: DiffObj[];
        delitems_path: DiffObj[];
        moditems_path: DiffObj[];
    } = {
        newitems_path: [],
        delitems_path: [],
        moditems_path: [],
    };
    // one transaction per session is allowed
    // so we need one session per diffTreesRecursive call
    const session = driver.session();
    const diff_result = await diffTrees(session, base_hash, diffee_hash);
    session.close();
    // we need to process Trees first since we need to run subqueries

    // process NEW
    //      partition newitems between blobs and trees

    const [new_diff_blobs_arr, new_diff_trees] = partition_blobs(
        diff_result.get(DiffStatus.NEW)!
    );
    diff_rec_result["newitems_path"].push(...new_diff_blobs_arr);

    // process new subtrees and get their blobs recursively
    const new_subblobs_arr: DiffObj[][] = await Promise.all(
        new_diff_trees.map((diff_obj) =>
            fetchRecusiveBlobs(driver, diff_obj.new_hash!, DiffStatus.NEW)
        )
    );
    for (const arr of new_subblobs_arr) {
        diff_rec_result["newitems_path"].push(...arr);
    }
    // update all objects to set the path
    for (const new_blob of diff_rec_result["newitems_path"]) {
        // update full path
        new_blob.path = path.join(current_path, new_blob.path);
        // console.debug(`NEW: ${new_blob.path}`);
        yield new_blob;
    }

    // process DEL
    //      partition newitems between blobs and trees
    const [del_diff_blobs_arr, del_diff_trees_arr] = partition_blobs(
        diff_result.get(DiffStatus.DEL)!
    );
    diff_rec_result["delitems_path"].push(...del_diff_blobs_arr);
    // process subtrees
    const del_subblobs_arr: DiffObj[][] = await Promise.all(
        del_diff_trees_arr.map((diff_obj) =>
            fetchRecusiveBlobs(driver, diff_obj.old_hash!, DiffStatus.DEL)
        )
    );
    for (const arr of del_subblobs_arr) {
        diff_rec_result["delitems_path"].push(...arr);
    }
    // update all objects to set the path
    for (const del_blob of diff_rec_result["delitems_path"]) {
        // update full path
        del_blob.path = path.join(current_path, del_blob.path);
        // console.debug(`DEL: ${del_blob.path}`);
        yield del_blob;
    }

    // process MOD
    const [mod_diff_blobs_arr, mod_diff_trees_arr] = partition_blobs(
        diff_result.get(DiffStatus.MOD)!
    );
    // update all objects to set the path
    for (const mod_blob of diff_rec_result["moditems_path"]) {
        // update full path
        mod_blob.path = path.join(current_path, mod_blob.path);
        // console.debug(`MOD: ${mod_blob.path}`);
        yield mod_blob;
    }
    diff_rec_result["moditems_path"].push(...mod_diff_blobs_arr);
    // process subtrees
    const sub_diff_result_arr = await Promise.all(
        mod_diff_trees_arr.map((diff_obj) =>
            diffTreesRecursive(
                driver,
                diff_obj.path,
                diff_obj.old_hash!,
                diff_obj.new_hash!
            )
        )
    );
    // yield subdirs
    for (const mod_sub_blob_arr of sub_diff_result_arr) {
        for await (const mod_sub_blob of mod_sub_blob_arr) {
            mod_sub_blob.path = path.join(current_path, mod_sub_blob.path);
            yield mod_sub_blob;
        }
    }
}

export { diffTreesRecursive, DiffStatus, DiffObj };
