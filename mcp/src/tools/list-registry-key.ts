import { z } from "zod";
import { GraphqlSdk } from "../graphql/client.js";
import { resolveHiveRoot } from "../resolve.js";
import type { Hive } from "../resolve.js";
import {
    advanceCursor,
    compositeHasMore,
    decodeCursor,
    encodeCursor,
} from "../pagination.js";
import { defineTool } from "../types.js";

export interface Subkey {
    name: string;
    hash: string;
}

export interface RegValue {
    name: string;
    type: string;
    value: string;
}

export interface ListRegistryKeyResult {
    subkeys: Subkey[];
    values: RegValue[];
    has_more: boolean;
    next_cursor: string | null;
}

const KEYS = ["keys", "values"];
const DEFAULT_LIMIT = 100;

export async function listRegistryKey(
    sdk: GraphqlSdk,
    ref: string,
    hive: Hive,
    key_path: string,
    limit?: number,
    cursor?: string,
): Promise<ListRegistryKeyResult> {
    const rootHash = await resolveHiveRoot(sdk, ref, hive);

    let keyHash = rootHash;
    if (key_path !== "/") {
        const traversed = await sdk.TraverseRegistryPath({
            rootHash,
            path: key_path,
        });
        if (!traversed.traversePath) {
            throw new Error(
                `Registry key not found in ${hive} ("${ref}"): ${key_path}`,
            );
        }
        keyHash = traversed.traversePath;
    }

    const state = decodeCursor(cursor, KEYS);
    const includeKeys = state.keys !== null;
    const includeValues = state.values !== null;

    const result = await sdk.ListRegistryKey({
        keyHash,
        first: limit ?? DEFAULT_LIMIT,
        afterKeys: state.keys || undefined,
        afterValues: state.values || undefined,
        includeKeys,
        includeValues,
    });

    const key = result.winRegKeys[0];
    if (!key) {
        throw new Error(
            `Registry key not found in ${hive} ("${ref}"): ${key_path}`,
        );
    }

    const subkeys = key.child_keysConnection;
    const values = key.child_valuesConnection;

    const next = advanceCursor(state, {
        keys: subkeys?.pageInfo,
        values: values?.pageInfo,
    });
    const has_more = compositeHasMore(next);

    return {
        subkeys: (subkeys?.edges ?? []).map((e) => ({
            name: e.properties.name,
            hash: e.node.hash,
        })),
        values: (values?.edges ?? []).map((e) => ({
            name: e.properties.name,
            type: e.node.type,
            value: e.node.value,
        })),
        has_more,
        next_cursor: has_more ? encodeCursor(next) : null,
    };
}

export default defineTool({
    name: "list_registry_key",
    description: `List the subkeys and values under a Windows registry key in an OS snapshot.

\`hive\` is the hive name, not its on-disk file: SAM, SECURITY, SOFTWARE, SYSTEM or DEFAULT. \`key_path\` is the path below that hive root, so HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run is hive="SOFTWARE", key_path="/Microsoft/Windows/CurrentVersion/Run". Pass key_path="/" for the hive root.

\`limit\` applies per category, so a limit of 100 can return up to 100 subkeys and 100 values. Pass \`next_cursor\` back as \`cursor\` unchanged.

To diff a registry subtree across two versions, use traverse_path + get_winreg_root + diff_nodes with parent_label="WinRegKey" and filter=["WinRegKey","WinRegValue"].`,
    schema: {
        ref: z
            .string()
            .min(1)
            .describe("Branch name or 40-character commit hash"),
        hive: z
            .enum(["SAM", "SECURITY", "SOFTWARE", "SYSTEM", "DEFAULT"])
            .describe("Registry hive name"),
        key_path: z
            .string()
            .startsWith("/")
            .describe(
                "Key path below the hive root, e.g. '/Microsoft/Windows/CurrentVersion/Run'. Use '/' for the hive root.",
            ),
        limit: z
            .number()
            .int()
            .positive()
            .max(500)
            .optional()
            .describe("Entries per category per page (default: 100)"),
        cursor: z
            .string()
            .optional()
            .describe(
                "next_cursor from the previous page, passed back unchanged",
            ),
    },
    handler: (sdk, { ref, hive, key_path, limit, cursor }) =>
        listRegistryKey(sdk, ref, hive, key_path, limit, cursor),
});
