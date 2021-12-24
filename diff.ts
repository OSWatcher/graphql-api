const path = require('path');

const DIFF_QUERY = `
MATCH (t:Tree)-[r:HAS_CHILD_BLOB|HAS_CHILD_TREE]->(c)
WHERE t.hash = $base
    OR t.hash = $diffee
RETURN t.hash as parent_hash, type(r) as type, r.name as name, c.hash as child_hash
`

async function diffTrees(session, base_hash: string, diffee_hash: string) {
    const result = await session.readTransaction(tx => {
        return tx.run(DIFF_QUERY, { base: base_hash, diffee: diffee_hash })
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
    const map_records = result.records.reduce((prev, current) => {
        const parent_hash = current.get('parent_hash');
        const type = current.get('type');
        const name = current.get('name');
        const child_hash = current.get('child_hash');
        prev[parent_hash][name] = {
            'type': type,
            'hash': child_hash
        }
        return prev;
    },
    // intial value
    {
        [base_hash]: {},
        [diffee_hash]: {}
    });
    const map_base = map_records[base_hash];
    const map_diffee = map_records[diffee_hash];
    // compute diff
    let diff_tree_result = {
        'newitems': {},
        'delitems': {},
        'moditems': {}
    };
    const base_filename_arr = Object.keys(map_base);
    const diffee_filename_arr = Object.keys(map_diffee);
    // extract newitems
    // filename dans diffee NOT IN base
    for (const new_name of diffee_filename_arr.filter(x => !base_filename_arr.includes(x))) {
        diff_tree_result['newitems'][new_name] = map_diffee[new_name];
    }
    // extract delitems
    // filename dans base NOT IN diffee
    for (const del_name of base_filename_arr.filter(x => !diffee_filename_arr.includes(x))) {
        diff_tree_result['delitems'][del_name] = map_base[del_name];
    }
    // modified items
    // filename present in both maps, but child hash is !=
    for (const same_name of diffee_filename_arr.filter(x => base_filename_arr.includes(x))) {
        if (map_diffee[same_name]['hash'] != map_base[same_name]['hash']) {
            diff_tree_result['moditems'][same_name] = {
                'type': map_base[same_name]['type'],
                'old_hash': map_base[same_name]['hash'],
                'new_hash': map_diffee[same_name]['hash']
            }
        }
    }
    return diff_tree_result;
}

async function diffTreesRecursive(driver, current_path: string, base_hash: string, diffee_hash: string) {
    // result
    let diff_rec_result = {
        'newitems_path': Array(),
        'deleteditems_path': Array(),
        'modifieditems_path': Array(),
    }
    // one transaction per session is allowed
    // so we need one session per diffTreesRecursive call
    const session = driver.session();
    let diff_result = await diffTrees(session, base_hash, diffee_hash);
    session.close();
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
    for (const name in diff_result['delitems']) {
        const item = diff_result['delitems'][name];
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
    // process modfied items
    // use Promise.all to process them in parallel
    //      build diff_obj first for all items
    const mod_diff_obj_arr = Object.keys(diff_result['moditems']).map(function(name, index) {
        const item = diff_result['moditems'][name];
        const diff_obj = {
            'path': path.join(current_path, name),
            'type': (item['type'] == 'HAS_CHILD_BLOB' ? 'Blob': 'Tree'),
            'old_hash': item['old_hash'],
            'new_hash': item['new_hash']
        };
        console.log("MOD: "+ diff_obj['path']);
        return diff_obj;
    });
    //      loop on diff obj array, for each Blob, push to diff_rec_result
    diff_rec_result['modifieditems_path'].push(
        ...mod_diff_obj_arr.filter(diff_obj => diff_obj['type'] == 'Blob')
    );
    //      loop on diff obj array, and for each Tree, parallel diffTreesRecursive execution
    const sub_diff_result_arr = await Promise.all(
        mod_diff_obj_arr.filter(diff_obj => diff_obj['type'] == 'Tree').map(
            diff_obj => diffTreesRecursive(driver, diff_obj['path'], diff_obj['old_hash'], diff_obj['new_hash'])
        )
    );
    //      merge results
    sub_diff_result_arr.map(sub_diff_result => {
        diff_rec_result['newitems_path'].push(...sub_diff_result['newitems_path']);
        diff_rec_result['deleteditems_path'].push(...sub_diff_result['deleteditems_path']);
        diff_rec_result['modifieditems_path'].push(...sub_diff_result['modifieditems_path']);
    });
    return diff_rec_result;
}

export { diffTreesRecursive };
