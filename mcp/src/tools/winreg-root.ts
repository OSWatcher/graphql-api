import { z } from "zod";
import { GraphqlSdk } from "../graphql/client.js";
import { defineTool } from "../types.js";

export interface WinregRootResult {
    winreg_hash: string | null;
}

export async function getWinregRoot(
    sdk: GraphqlSdk,
    blob_hash: string,
): Promise<WinregRootResult> {
    const result = await sdk.GetBlobWinRegRoot({ hash: blob_hash });
    const blob = result.blobs[0];
    return { winreg_hash: blob?.has_winreg?.hash ?? null };
}

export default defineTool({
    name: "get_winreg_root",
    description: `Resolve a Blob hash to its Windows registry root (WinRegKey) hash by following the HAS_WINREG relationship.

Use this after traverse_path to get the registry root hash needed for diff_nodes registry diffs.

Known Windows registry hive locations:
  HKEY_LOCAL_MACHINE/SAM      → /Windows/System32/config/SAM
  HKEY_LOCAL_MACHINE/SECURITY → /Windows/System32/config/SECURITY
  HKEY_LOCAL_MACHINE/SOFTWARE → /Windows/System32/config/SOFTWARE
  HKEY_LOCAL_MACHINE/SYSTEM   → /Windows/System32/config/SYSTEM
  HKEY_USERS/.DEFAULT         → /Windows/System32/config/DEFAULT

Registry diff procedure:
  1. traverse_path(base_ref, "/Windows/System32/config/SOFTWARE") → hash_A
  2. get_winreg_root(hash_A) → winreg_hash_A
  3. traverse_path(diffee_ref, "/Windows/System32/config/SOFTWARE") → hash_B
  4. get_winreg_root(hash_B) → winreg_hash_B
  5. diff_nodes(winreg_hash_A, winreg_hash_B, parent_label="WinRegKey", filter=["WinRegKey","WinRegValue"])

Prefer get_struct / list_tree / list_registry_key / list_symbols unless you need raw hash access.`,
    schema: {
        blob_hash: z
            .string()
            .min(1)
            .describe("Blob node hash (from traverse_path)"),
    },
    handler: (sdk, { blob_hash }) => getWinregRoot(sdk, blob_hash),
});
