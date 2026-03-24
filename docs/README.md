# OSWatcher GraphQL API Documentation

This documentation follows the [Divio documentation framework](https://documentation.divio.com/), organizing content into four categories:

## Documentation Structure

### 📚 [Reference](./reference/)
*Information-oriented - Technical descriptions*

Reference documentation provides technical specifications and API details.

- [Data Model](./reference/data-model.md) - Core graph structure and merkle tree architecture
- [Blob Download API](./reference/blob-api.md) - Complete REST API specification for blob downloads
- [Access Restrictions](./reference/access-restrictions.md) - Comprehensive catalog of all access control and data filtering mechanisms

### 📖 [How-To Guides](./how-to/)
*Problem-oriented - Step-by-step instructions*

How-to guides show you how to solve specific problems and complete tasks.

- [Configure Blob Restrictions](./how-to/configure-blob-restrictions.md) - Set up branch-based blob access control
- [Integrate Blob API (Frontend)](./how-to/integrate-blob-api.md) - Use the blob API from your frontend application

### 💡 [Explanation](./explanation/)
*Understanding-oriented - Conceptual information*

Explanation documentation helps you understand the concepts and design decisions.

- [Blob Authorization Deep Dive](./explanation/blob-authorization.md) - How blob restrictions work internally

### 🎓 Tutorials
*Learning-oriented - Step-by-step learning paths*

> Tutorials are planned for future releases. They will guide you through building complete features from scratch.

## Quick Links

### For Developers

**Just getting started?**
- Read [Blob Authorization Explanation](./explanation/blob-authorization.md) to understand why restrictions exist
- Follow [Configure Blob Restrictions](./how-to/configure-blob-restrictions.md) to set up your environment

**Integrating the API?**
- Check [Blob API Reference](./reference/blob-api.md) for complete endpoint specifications
- Review [Access Restrictions](./reference/access-restrictions.md) to understand security controls
- Follow [Frontend Integration Guide](./how-to/integrate-blob-api.md) for client implementation

**Troubleshooting?**
- See troubleshooting section in [Configuration Guide](./how-to/configure-blob-restrictions.md#troubleshooting)
- Check error codes in [API Reference](./reference/blob-api.md#error-responses)

### For System Administrators

**Configuring restrictions:**
1. Set `OBJECT_STORAGE_URI` and `RESTRICTED_BRANCH_NAME` in `.env`
2. Verify with test requests (see [Configuration Guide](./how-to/configure-blob-restrictions.md#step-3-test-blob-restrictions))
3. Monitor logs for authorization decisions

**Security considerations:**
- Review [Security Considerations](./explanation/blob-authorization.md#security-considerations)
- Configure S3 bucket policies to prevent direct access
- Monitor 403 responses for unauthorized access attempts

## Feature Overview: Blob Download Restrictions

### Problem
Windows binaries cannot be redistributed due to Microsoft licensing restrictions, but the system needs to allow exploration and downloading of Linux files.

### Solution
A two-tier approach:
1. **GraphQL API** - Returns blob hashes freely for exploration (browsing, searching, diffing)
2. **REST API** - Controls actual downloads with branch-based authorization

### Key Concepts

**Branch-Based Restrictions**: Blobs are restricted if they belong exclusively to a configured restricted branch (e.g., `windows-10`).

**Fail-Safe Default**: If authorization check fails, access is denied (better to block accidentally than allow).

**Streaming Architecture**: Large files are streamed directly from object storage without buffering in memory.

## Contributing to Documentation

When adding new documentation:

1. **Determine the category** using Divio framework:
   - **Tutorial**: Learning-oriented, hands-on lessons
   - **How-to**: Problem-solving, practical steps
   - **Reference**: Information-oriented, technical specs
   - **Explanation**: Understanding-oriented, conceptual

2. **Use the appropriate directory**:
   - `docs/tutorials/` - Not yet created
   - `docs/how-to/`
   - `docs/reference/`
   - `docs/explanation/`

3. **Link to related docs**: Each document should reference related content in other categories

4. **Keep it focused**: Each document should serve one purpose in one category

## Project Information

- **Repository**: [OSWatcher/graphql-api](https://github.com/OSWatcher/graphql-api)
- **Main README**: [../README.md](../README.md) - Project setup and configuration
- **CLAUDE.md**: [../CLAUDE.md](../CLAUDE.md) - Development guidelines for AI assistants

## Additional Resources

- [Neo4j GraphQL Documentation](https://neo4j.com/docs/graphql-manual/current/)
- [Apollo Server Documentation](https://www.apollographql.com/docs/apollo-server/)
- [Divio Documentation System](https://documentation.divio.com/)
