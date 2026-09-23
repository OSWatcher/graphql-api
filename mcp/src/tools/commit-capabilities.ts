import { z } from "zod";
import { GraphqlSdk } from "../graphql/client.js";
import { resolveCommitRef } from "../resolve.js";
import { defineTool } from "../types.js";

export interface CommitCapabilities {
    commit_hash: string;
    labels: string[];
}

export async function getCommitCapabilities(
    sdk: GraphqlSdk,
    ref: string,
): Promise<CommitCapabilities> {
    const { commitHash } = await resolveCommitRef(sdk, ref);
    const result = await sdk.GetCommitCapabilities({ commitHash });
    return {
        commit_hash: commitHash,
        labels: result.getCommitExtractedDataLabels,
    };
}

export default defineTool({
    name: "get_commit_capabilities",
    description: `List which kinds of data were extracted for an OS snapshot: node labels such as Tree, Blob, WinRegKey, Symbol, Struct.

Call this first when you are unsure whether a snapshot has registry or PDB data at all. It saves discovering the absence through an empty result from list_registry_key or list_symbols.`,
    schema: {
        ref: z
            .string()
            .min(1)
            .describe("Branch name or 40-character commit hash"),
    },
    handler: (sdk, { ref }) => getCommitCapabilities(sdk, ref),
});
