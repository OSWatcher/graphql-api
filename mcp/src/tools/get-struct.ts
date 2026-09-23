import { z } from "zod";
import { GraphqlSdk } from "../graphql/client.js";
import { resolveBlobHash } from "../resolve.js";
import { defineTool } from "../types.js";

export interface StructField {
    name: string;
    offset: number;
    data_type: unknown;
}

export interface StructResult {
    name: string;
    hash: string;
    size: number;
    kind: string;
    field_count: number;
    fields: StructField[];
}

export async function getStruct(
    sdk: GraphqlSdk,
    ref: string,
    blob_path: string,
    struct_name: string,
): Promise<StructResult> {
    const blobHash = await resolveBlobHash(sdk, ref, blob_path);

    const byName = await sdk.FetchStructByName({
        blobHash,
        structName: struct_name,
    });

    const blob = byName.blobs[0];
    if (!blob) {
        throw new Error(`${blob_path} has no PDB symbol or struct data`);
    }

    const edge = blob.has_structConnection.edges[0];
    if (!edge) {
        throw new Error(
            `Struct "${struct_name}" not found in ${blob_path}. Use list_structs to see what is available.`,
        );
    }

    const fieldsResult = await sdk.FetchStructFields({
        structHash: edge.node.hash,
    });

    const fields = (fieldsResult.structs[0]?.fieldsConnection.edges ?? [])
        .map((e) => ({
            name: e.properties.name,
            offset: e.node.offset,
            data_type: e.node.data_type,
        }))
        .sort((a, b) => a.offset - b.offset);

    return {
        name: edge.properties.name,
        hash: edge.node.hash,
        size: edge.node.size,
        kind: edge.node.kind,
        field_count: fields.length,
        fields,
    };
}

export default defineTool({
    name: "get_struct",
    description: `Read a C struct's full field layout from a PE file's PDB data, by name.

Returns every field with its name, byte offset and type, sorted by offset (the complete type layout, not a delta).

Example: get_struct(ref="windows_11_24h2", blob_path="/Windows/System32/ntoskrnl.exe", struct_name="_EPROCESS")

Use list_structs to discover which structs a PE file exposes. To compare a struct across two OS versions, use diff_nodes with filter=["StructField"], at_path="/<struct name>" and max_depth=1.`,
    schema: {
        ref: z
            .string()
            .min(1)
            .describe("Branch name or 40-character commit hash"),
        blob_path: z
            .string()
            .startsWith("/")
            .describe(
                "Absolute path to the PE file, e.g. '/Windows/System32/ntoskrnl.exe'",
            ),
        struct_name: z
            .string()
            .min(1)
            .describe("Exact struct name, e.g. '_EPROCESS'"),
    },
    handler: (sdk, { ref, blob_path, struct_name }) =>
        getStruct(sdk, ref, blob_path, struct_name),
});
