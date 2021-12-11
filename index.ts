const { Neo4jGraphQL } = require("@neo4j/graphql");
const { ApolloServer, gql } = require("apollo-server");
const { readFileSync } = require('fs');
const neo4j = require("neo4j-driver");
require("dotenv").config();

// we must convert the file Buffer to a UTF-8 string
const typeDefs = readFileSync('./type-defs.graphql').toString('utf-8')

const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);

const resolvers = {
  Mutation: {
    async mergeTree(_source, {input}) {
      const session = driver.session()
      const prom = driver.session().writeTransaction(tx => {
          // merge parent tree
          tx.run(
            "MERGE (parent:Tree {hash: $hash})",
            {'hash': input['hash']}
          )
          if ('child_blobs' in input) {
              // merge blobs with relationships
              tx.run(`
                    MATCH (p:Tree {hash: $parent_hash})
                    WITH p
                    UNWIND $unwind_param as rel
                    MERGE (c:Blob {hash: rel.node.hash})
                    MERGE (p)-[:HAS_CHILD_BLOB {name: rel.edge.name}]->(c)
                    ` , {'parent_hash': input['hash'], 'unwind_param':
                         input['child_blobs']['create']})
          }
          if ('child_trees' in input) {
              // merge trees with relationships
              tx.run(`
                    MATCH (p:Tree {hash: $parent_hash})
                    WITH p
                    UNWIND $unwind_param as rel
                    MERGE (c:Tree {hash: rel.node.hash})
                    MERGE (p)-[:HAS_CHILD_TREE {name: rel.edge.name}]->(c)
                    ` , {'parent_hash': input['hash'], 'unwind_param':
                         input['child_trees']['create']})
          }
      })
      try {
          const result = await prom;
      } catch(error) {
          console.log(error)
      }
      session.close()
      return "hello";
    }
  }
};

const neoSchema = new Neo4jGraphQL({ typeDefs, driver, resolvers });

const server = new ApolloServer({
    schema: neoSchema.schema,
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
