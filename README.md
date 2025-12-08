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

# Auth0 Authentication
AUTH0_DOMAIN_URI=
AUTH0_AUDIENCE=

# Object Storage (S3/MinIO)
OBJECT_STORAGE_URI=
MINIO_ACCESS_KEY=
MINIO_SECRET_KEY=
MINIO_OBJECTS_BUCKET_NAME=objects

# Blob Access Control
RESTRICTED_BRANCH_NAME=

# Optional - PostHog Analytics (production only)
POSTHOG_HOST=https://us.i.posthog.com
POSTHOG_PROJECT_API_KEY=

# Optional - Environment
NODE_ENV=development
ALLOWED_ORIGINS=https://oswatcher.github.io,http://127.0.0.1:8080

# Optional - Registry Filtering
# Comma-separated list of sensitive registry value names to redact
# Default: DigitalProductId,ProductId
SENSITIVE_REGISTRY_VALUES=

# Optional - Diff Date Limitation
# Year limit for non-filesystem diffs (Blob/WinRegKey)
# Diffs for nodes only in commits after this year are restricted
# Default: 2020
DIFF_DATE_LIMIT_YEAR=2020
~~~
