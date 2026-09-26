import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { GraphqlSdk } from "./graphql/client.js";
import { tools } from "./tools/index.js";

export function createServer(sdk: GraphqlSdk): McpServer {
    const server = new McpServer({
        name: "oswatcher",
        version: "1.0.0",
    });

    for (const tool of tools) {
        server.tool(
            tool.name,
            tool.description,
            tool.schema,
            async (args: any) => {
                try {
                    const result = await tool.handler(sdk, args);
                    return {
                        content: [
                            {
                                type: "text" as const,
                                text:
                                    typeof result === "string"
                                        ? result
                                        : JSON.stringify(result, null, 2),
                            },
                        ],
                    };
                } catch (error) {
                    return {
                        content: [
                            {
                                type: "text" as const,
                                text: `Error: ${error instanceof Error ? error.message : String(error)}`,
                            },
                        ],
                        isError: true,
                    };
                }
            },
        );
    }

    return server;
}
