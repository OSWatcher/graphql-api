import { z } from "zod";
import { resolveCommitRef } from "../resolve.js";
import { defineTool } from "../types.js";
import type { GraphqlSdk } from "../graphql/client.js";

export interface BlobWithSymbols {
    blob_hash: string;
    blob_path: string;
}

export async function getBlobsWithSymbols(
    sdk: GraphqlSdk,
    ref: string,
): Promise<BlobWithSymbols[]> {
    const { commitHash } = await resolveCommitRef(sdk, ref);

    const result = await sdk.GetBlobsWithSymbols({ commitHash });

    return result.getBlobsWithSymbols.map((b) => ({
        blob_hash: b.blob_hash,
        blob_path: b.blob_path,
    }));
}

export default defineTool({
    name: "get_blobs_with_symbols",
    description: `Return all PE Blob files in a commit that have associated PDB symbols or struct data.

Use this tool to discover blob hashes before calling diff_nodes for symbol or struct diffs.

Symbols diff procedure:
  1. get_blobs_with_symbols(base_ref) → find blob matching target PE by blob_path suffix → blob_hash_A
  2. get_blobs_with_symbols(diffee_ref) → blob_hash_B
  3. diff_nodes(blob_hash_A, blob_hash_B, parent_label="Blob", filter=["Symbol"], max_depth=1)

Structs list diff procedure:
  Same as symbols but filter=["Struct"] and max_depth=1 (required)

Struct fields diff for a specific struct (e.g. _EPROCESS):
  Same blob resolution, then:
  diff_nodes(..., parent_label="Blob", filter=["StructField"], at_path="/_EPROCESS", max_depth=1)
  Add status_filter=["NEW","MOD","DEL","UNCHANGED"] to reconstruct the full C type layout.`,
    schema: {
        ref: z.string().min(1).describe("Branch name or commit hash"),
    },
    handler: (sdk, { ref }) => getBlobsWithSymbols(sdk, ref),
});
