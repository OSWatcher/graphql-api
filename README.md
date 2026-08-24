# GraphQL-API

This repository contains the API server for OSWatcher, based on GraphQL and the
[Neo4j library](https://neo4j.com/docs/graphql-manual/current/)

## Configuration

Create and fill a `.env` configuration file:

~~~
# Neo4j Database
NEO4J_URI=
NEO4J_USER=neo4j
NEO4J_PASSWORD=

# Object Storage (S3/MinIO)
OBJECT_STORAGE_URI=
MINIO_ACCESS_KEY=
MINIO_SECRET_KEY=
MINIO_OBJECTS_BUCKET_NAME=objects

# Optional - Blob Access Control
# Unused unless the restriction commented out in src/rest-routes.ts is
# re-enabled (see docs/reference/access-restrictions.md)
RESTRICTED_BRANCH_NAME=

# Optional - PostHog Analytics (production only)
POSTHOG_HOST=https://us.i.posthog.com
POSTHOG_PROJECT_API_KEY=

# Optional - Environment
NODE_ENV=development
ALLOWED_ORIGINS=https://oswatcher.github.io,http://127.0.0.1:8080

# Optional - Registry Filtering
# Unused unless the plugin commented out in src/index.ts is re-enabled
# (see docs/reference/access-restrictions.md)
# Comma-separated list of sensitive registry value names to redact
# Default: DigitalProductId,ProductId
SENSITIVE_REGISTRY_VALUES=
~~~
