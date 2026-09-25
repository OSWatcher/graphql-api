# OSWatcher MCP Server

An MCP (Model Context Protocol) server that exposes OSWatcher's OS intelligence graph to AI assistants as a set of tools. It sits in front of the `api` GraphQL service and lets an assistant answer questions like "what changed in `ntdll.dll` between these two Windows builds" or "what is the field layout of `_EPROCESS` in this snapshot" without the assistant having to know Cypher or the underlying graph schema.

It is a separate Docker service from `api` (this directory has its own `Dockerfile`, `package.json`, `tsconfig.json` and codegen; the root `tsconfig.json` excludes it), and it talks to the API over plain GraphQL. It carries no authentication of its own: the API it calls is unauthenticated, and access control is expected to sit in front of whatever exposes the MCP server's HTTP endpoint.

## How it works

Each tool call resolves a small chain of GraphQL queries against the graph and returns a plain JSON result over MCP. `src/resolve.ts` does that resolution client-side (branch or commit ref to filesystem hash, path to node hash, and so on), the same way the OSWatcher frontend composes queries with its own Apollo cache. 0.1 adds no resolvers to the API beyond paginated search: the API stays a stable, open-source artifact with two consumers (the frontend and this server), and the extra GraphQL round trips are cheap because both services sit in the same compose network.

## Running it

The server is meant to run as the `mcp` service in the OSWatcher compose stack (`compose.dev.yml`), on port 3001, built with `context: ../graphql-api`. That means this repository (`graphql-api`) and the compose stack's repository must be checked out as sibling directories on disk.

Because `mcp` is a separate service from `api`, rebuilding `api` does not rebuild it. After changing anything under `mcp/`, rebuild explicitly:

```bash
docker compose -f compose.yml -f compose.dev.yml up --build mcp -d
```

The server reads `GRAPHQL_API_URL` for the GraphQL endpoint to call (`http://api:4000/graphql` inside the compose network) and `MCP_PORT` for the port it listens on (defaults to 3001). It exposes `POST /mcp` for the MCP protocol itself and `GET /health` for a plain liveness check.

## Attaching it to Claude Code

Once the `mcp` service is up and reachable at `http://localhost:3001`, register it as an HTTP MCP server:

```bash
claude mcp add --transport http oswatcher http://localhost:3001/mcp
```

## Tools (17 total)

Task-shaped tools take `(ref, path, ...)` and resolve the chain internally. The hash-based tools are retained as an escape hatch for entity combinations the task-shaped ones do not reach.

| Tool | Description |
|------|-------------|
| `list_branches` | List OS branches with optional name filter |
| `list_commits` | List commits on a branch |
| `get_commit_capabilities` | Which data kinds were extracted for a snapshot |
| `list_tree` | List a directory's subdirectories and files |
| `list_registry_key` | List a registry key's subkeys and values, by hive name |
| `get_struct` | A struct's full field layout, by name |
| `list_structs` | Structs a PE file defines, optionally by name |
| `list_symbols` | Symbols a PE file exports, optionally by name |
| `git_log` | How one entity changed across commit history |
| `diff_versions` | Filesystem diff between two refs at a path |
| `search` | Substring search across filesystem/registry/symbols/structs |
| `search_next` | Next page of a search session |
| `search_close` | End a search session early |
| `traverse_path` | Raw: walk the filesystem from a ref to a path |
| `get_winreg_root` | Raw: follow `HAS_WINREG` from a Blob hash |
| `get_blobs_with_symbols` | Raw: PE blobs that carry PDB data |
| `diff_nodes` | Raw: diff on node hashes, any entity type |

Every paginated tool returns the same `{ items, has_more, next_cursor }` envelope (or, for the two-connection tools `list_tree` and `list_registry_key`, the same shape but with `directories`/`files` or `subkeys`/`values` in place of `items`), regardless of whether the underlying mechanism is a Neo4j connection cursor, `git_log`'s offset, or a `search` session ID. Pass `next_cursor` back as the tool's `cursor` (or `offset`, for `git_log`) unchanged to get the next page.

## Regenerating the SDK

The typed GraphQL client at `src/graphql/generated/sdk.ts` is generated from `src/graphql/queries.graphql` against the API's live schema:

```bash
npm run generate
```

This reads the schema from a **running** API on `http://localhost:4000/graphql` (see `codegen.yml`), so start the `api` service before running it. Regenerate after adding or changing any query in `queries.graphql`.

Other useful scripts (see `package.json`): `npm run build` (compiles with `tsc`), `npm test` (Jest), `npm start` (runs the built server from `dist/`).

## Constraints

**Search sessions are process-local.** `src/search-session.ts` holds open search sessions in an in-memory `Map`, so the API cannot be horizontally scaled while sessions are in use. This does not affect `mcp` itself scaling, only the `api` service it depends on for `search`/`search_next`/`search_close`.

**0.1 requires a source checkout.** No image is published for this service yet: it is built locally from this repository via the `Dockerfile` in this directory, as part of the sibling-checkout compose setup described above. There is no way to pull and run it standalone today.
