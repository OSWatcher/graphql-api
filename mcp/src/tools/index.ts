import type { ToolModule } from "../types.js";
import listBranches from "./branches.js";
import listCommits from "./commits.js";
import diffVersions from "./diff.js";
import search from "./search.js";
import searchNext from "./search-next.js";
import searchClose from "./search-close.js";
import traversePath from "./traverse-path.js";
import getWinregRoot from "./winreg-root.js";
import getBlobsWithSymbols from "./blobs-with-symbols.js";
import diffNodes from "./diff-nodes.js";
import getStruct from "./get-struct.js";
import listStructs from "./list-structs.js";
import listSymbols from "./list-symbols.js";
import listTree from "./list-tree.js";
import listRegistryKey from "./list-registry-key.js";
import gitLog from "./git-log.js";
import getCommitCapabilities from "./commit-capabilities.js";

export const tools: ToolModule<any>[] = [
    listBranches,
    listCommits,
    diffVersions,
    search,
    searchNext,
    searchClose,
    traversePath,
    getWinregRoot,
    getBlobsWithSymbols,
    diffNodes,
    getStruct,
    listStructs,
    listSymbols,
    listTree,
    listRegistryKey,
    gitLog,
    getCommitCapabilities,
];
