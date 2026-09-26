import express from "express";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { createSdk } from "./graphql/client.js";
import { createServer } from "./server.js";

const MCP_PORT = parseInt(process.env.MCP_PORT || "3001", 10);

// Request-invariant: no per-request credential to bind.
const sdk = createSdk();

const app = express();
app.use(express.json());

app.post("/mcp", async (req, res) => {
    // A new McpServer per request: an McpServer binds to a single transport
    // on connect, and the transport is stateless.
    const mcpServer = createServer(sdk);
    const transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: undefined, // stateless
    });

    res.on("close", () => {
        transport.close();
    });

    await mcpServer.connect(transport);
    await transport.handleRequest(req, res, req.body);
});

app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
});

app.listen(MCP_PORT, () => {
    console.log(`OSWatcher MCP server listening on port ${MCP_PORT}`);
});
