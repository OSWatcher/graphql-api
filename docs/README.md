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

- [Integrate Blob API (Frontend)](./how-to/integrate-blob-api.md) - Use the blob API from your frontend application

### 💡 [Explanation](./explanation/)
*Understanding-oriented - Conceptual information*

Explanation documentation helps you understand the concepts and design decisions.

- [Query Optimization](./explanation/query-optimization.md) - CALL {} subquery pattern for variable-length path queries

### 🎓 Tutorials
*Learning-oriented - Step-by-step learning paths*

> Tutorials are planned for future releases. They will guide you through building complete features from scratch.

## Quick Links

### For Developers

**Integrating the API?**
- Check [Blob API Reference](./reference/blob-api.md) for complete endpoint specifications
- Review [Access Restrictions](./reference/access-restrictions.md) to understand security controls
- Follow [Frontend Integration Guide](./how-to/integrate-blob-api.md) for client implementation

**Troubleshooting?**
- Check error codes in [API Reference](./reference/blob-api.md#error-responses)

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
