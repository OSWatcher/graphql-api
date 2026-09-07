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

# Optional - Environment
NODE_ENV=development

# Optional - Registry Filtering
# Unused unless the plugin commented out in src/index.ts is re-enabled
# (see docs/reference/access-restrictions.md)
# Comma-separated list of sensitive registry value names to redact
# Default: DigitalProductId,ProductId
SENSITIVE_REGISTRY_VALUES=
~~~
