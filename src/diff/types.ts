export enum NodeType {
    Blob,
    Tree,
}

export enum DiffStatus {
    NEW,
    MOD,
    DEL,
}

export type DiffResult = {
    newitems: DiffObj[];
    delitems: DiffObj[];
    moditems: DiffObj[];
};

export type DiffObj = {
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
    old_hash: null | string;
    new_hash: null | string;
};

// type HashDiff = {
//     base: string | null;
//     diffee: string | null;
//     path: string | null;
// };

type Hash = string;
type Filename = string;
interface TreeNode {
    type: NodeType;
    hash: Hash;
}
export type DirectoryContentsMap = Record<Filename, TreeNode>;


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
export type DiffMap = Record<Hash, DirectoryContentsMap>;

export interface DiffQueryResult {
    parent_hash: string;
    name: string;
    type: string;
    child_hash: string;
}