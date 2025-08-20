# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a GraphQL API server for OSWatcher that uses Neo4j as the database and provides filesystem analysis, diff computation, and search capabilities. The server proxies PostHog analytics events in production mode.

## Development Commands

### Build and Run
- `npm run build` - Compile TypeScript to JavaScript in dist/
- `npm run serve` - Build and start the server
- `npm run serve_from_build` - Start server from existing build

### Code Quality
- `npm run format` - Format code with Prettier (tabWidth: 4)
- `npm run format-check` - Check code formatting
- `npm run lint` - Run ESLint on TypeScript files
- `npm run ccode` - Run both format and lint (recommended before commits)

### Testing
- `npm test` - Run all tests with Jest
- `npm run test:watch` - Run tests in watch mode

### Development Tools
- `npm run gentypes` - Generate TypeScript types from GraphQL schema
- `npm run profile` - Run server with Node.js profiler

## Architecture

### Core Technologies
- **Apollo Server 4** with Express middleware for GraphQL API
- **Neo4j GraphQL Library** for schema-first GraphQL development
- **Neo4j Driver** for direct database queries and transactions
- **TypeScript** with ES2022 target and NodeNext modules

### Key Components

#### Entry Point (`src/index.ts`)
- Initializes Neo4j driver and constraints
- Sets up Apollo Server with Express
- Configures PostHog analytics proxy (production only)
- Serves GraphQL endpoint at `/graphql` on port 4000

#### GraphQL Schema (`type-defs.graphql`)
- Defines filesystem entities: Blob, Tree, Commit, Branch
- Windows-specific types: WinRegKey, WinRegValue, Symbol, WinStruct
- Custom query types for diff operations and search results
- Uses `@neo4j/graphql` directives for database mapping

#### Resolvers (`src/resolvers.ts`)
- Custom resolvers for complex operations not handled by Neo4j GraphQL
- Key resolvers: `diffNodesAt`, `fetchCommitHistory`, `search`, `traversePath`
- Handles pagination, filtering, and data transformation

#### Diff System (`src/diff/`)
- `diff.ts` - Iterative tree diffing with async generators
- `utils.ts` - Type conversion utilities
- `types.ts` - TypeScript type definitions
- Uses custom Cypher queries for efficient Neo4j traversal

#### Search (`src/search.ts`)
- Filesystem path search with full path reconstruction
- Returns commit context with search results

### Database Integration
- Neo4j constraints are applied on startup via `src/constraints.ts`
- Uses both OGM (Object Graph Mapping) and direct Cypher queries
- Transaction management with session isolation for concurrent operations

### Configuration
- Environment variables: `NEO4J_URI`, `NEO4J_USER`, `NEO4J_PASSWORD`
- PostHog analytics configuration (production only)
- TypeScript strict mode enabled

## Testing Strategy
- Jest with ts-jest for TypeScript support
- ESM module support configured
- Test files in `tests/` directory
- Separate test utilities in `test_utils.ts`

## Key Patterns
- Async generators for streaming large datasets
- Session-per-transaction pattern for Neo4j
- Express middleware integration with Apollo Server
- Schema-first GraphQL development
- Type-safe database operations with generated types