import type { z } from "zod";
import type { GraphqlSdk } from "./graphql/client.js";

/**
 * A tool is a self-describing module. server.ts iterates these and applies the
 * content/error envelope once, instead of repeating it per handler.
 */
export interface ToolModule<S extends z.ZodRawShape = z.ZodRawShape> {
    name: string;
    description: string;
    schema: S;
    handler: (
        sdk: GraphqlSdk,
        args: z.objectOutputType<S, z.ZodTypeAny>,
    ) => Promise<unknown>;
}

/** Identity helper that pins S so handler args are inferred from the schema. */
export function defineTool<S extends z.ZodRawShape>(
    tool: ToolModule<S>,
): ToolModule<S> {
    return tool;
}
