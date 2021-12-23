const path = require('path');

const DIFF_QUERY = `
// use a single match to capture all nodes from both Trees
// if we use 2 MATCH statement separated by a WITH and the second MATCH return no records (empty directory)
// then both map_base and map_diffee will return no records
MATCH (t:Tree)-[r:HAS_CHILD_BLOB|HAS_CHILD_TREE]->(c)
WHERE t.hash = $base
    OR t.hash = $diffee
WITH
// conditional collect to differentiate between base and diffee nodes 
    collect(CASE
        WHEN t.hash = $base THEN [r.name, {type: type(r), hash: c.hash}]
        END) as tmp_col_base,
    collect(CASE
        WHEN t.hash = $diffee THEN [r.name, {type: type(r), hash: c.hash}]
        END) as tmp_col_diffee
WITH apoc.map.fromPairs(
    tmp_col_base
) as map_base,
    apoc.map.fromPairs(
        tmp_col_diffee
    ) as map_diffee
// new items
//      filename in diffee NOT IN base
WITH apoc.map.submap(map_diffee, [k IN keys(map_diffee) WHERE NOT k IN keys(map_base)]) as map_newitems,

// deleted items
//      filename in base NOT IN diffee anymore
apoc.map.submap(map_base, [k IN keys(map_base) WHERE NOT k IN keys(map_diffee)]) as map_deleteditems,

// modified items
//      filename both IN base and diffee
//      child hash is !=
apoc.map.fromPairs(
    [k IN
            // compute intersection of both map keys
            apoc.coll.intersection(
                keys(map_base), keys(map_diffee)
            )
            // filter on hash !=
            // build pair [filename, {type, old_hash, new_hash}]
            WHERE map_base[k].hash <> map_diffee[k].hash | [
                k, {
                        type: map_base[k].type,
                        old_hash: map_base[k].hash,
                        new_hash: map_diffee[k].hash
                   }
                ]
    ]
) as map_modifieditems

RETURN map_newitems, map_deleteditems, map_modifieditems
`

async function diffTrees(session, base_hash: string, diffee_hash: string) {
    const result = await session.readTransaction(tx => {
        return tx.run(DIFF_QUERY, { base: base_hash, diffee: diffee_hash })
    });
    const record = result.records[0];
    return {
        'newitems': record.get('map_newitems'),
        'deleteditems': record.get('map_deleteditems'),
        'modifieditems': record.get('map_modifieditems')
    };
}

async function diffTreesRecursive(session, current_path: string, base_hash: string, diffee_hash: string) {
    // result
    let diff_rec_result = {
        'newitems_path': Array(),
        'deleteditems_path': Array(),
        'modifieditems_path': Array(),
    }
    let diff_result = await diffTrees(session, base_hash, diffee_hash);
    // process new
    for (const name in diff_result['newitems']) {
        const item = diff_result['newitems'][name];
        const diff_obj = {
            'path': path.join(current_path, name),
            'type': (item['type'] == 'HAS_CHILD_BLOB' ? 'Blob': 'Tree'),
            'old_hash': undefined,
            'new_hash': item['hash']
        }
        console.log("NEW: "+ diff_obj['path']);
        diff_rec_result['newitems_path'].push(diff_obj);
        if (item['type'] == "HAS_CHILD_TREE") {
            // TODO: list filesystem of diffee_hash at this path
            // new directory on diffee_hash
        }
    }
    // process deleted
    for (const name in diff_result['deleteditems']) {
        const item = diff_result['deleteditems'][name];
        const diff_obj = {
            'path': path.join(current_path, name),
            'type': (item['type'] == 'HAS_CHILD_BLOB' ? 'Blob': 'Tree'),
            'old_hash': item['hash'],
            'new_hash': undefined
        }
        console.log("DEL: "+ diff_obj['path']);
        diff_rec_result['deleteditems_path'].push(diff_obj);
        if (item['type'] == "HAS_CHILD_TREE") {
            // TODO: list filesystem of base_hash at this path
            // deleted directory on diffee_hash, was present on base_hash
        }
    }
    // process modfied
    for (const name in diff_result['modifieditems']) {
        const item = diff_result['modifieditems'][name];
        const diff_obj = {
            'path': path.join(current_path, name),
            'type': (item['type'] == 'HAS_CHILD_BLOB' ? 'Blob': 'Tree'),
            'old_hash': item['old_hash'],
            'new_hash': item['new_hash']
        }
        console.log("MOD: "+ diff_obj['path']);
        diff_rec_result['modifieditems_path'].push(diff_obj);
        if (item['type'] == "HAS_CHILD_TREE") {
            // recurse
            let sub_diff_rec_result = await diffTreesRecursive(session, diff_obj['path'], diff_obj['old_hash'], diff_obj['new_hash']);
            // merge results
            diff_rec_result['newitems_path'].push(...sub_diff_rec_result['newitems_path']);
            diff_rec_result['deleteditems_path'].push(...sub_diff_rec_result['deleteditems_path']);
            diff_rec_result['modifieditems_path'].push(...sub_diff_rec_result['modifieditems_path']);
        }
    }
    return diff_rec_result;
}

export { diffTreesRecursive };
