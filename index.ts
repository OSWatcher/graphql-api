const { Neo4jGraphQL } = require("@neo4j/graphql");
const { OGM } = require("@neo4j/graphql-ogm");
const { ApolloServer, gql } = require("apollo-server");
const { readFileSync } = require('fs');
const neo4j = require("neo4j-driver");
require("dotenv").config();

import { createConstraintsIfNotExists } from './constraints';
import { diffTreesRecursive } from './diff';

const ROOT_PATH = '/';

// Neo4j driver instance
const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);

// ensure Neo4j constraints are applied
console.log("Ensure Neo4j constraints are effective");
createConstraintsIfNotExists(driver);

// we must convert the file Buffer to a UTF-8 string
const typeDefs = readFileSync('./type-defs.graphql').toString('utf-8')

// OGM instance
const ogm = new OGM({ typeDefs, driver });


const resolvers = {
  Query: {
    async diffCommits(_source, {base_commit_hash, diffee_commit_hash}) {
      // find Commits based on hash
      const Commit = ogm.model("Commit");
      const arr_commit = await Promise.all([base_commit_hash, diffee_commit_hash].map(async hash => {
        // select filesystem relationship and get the root Tree hash
        const selectionSet = `
          {
            hash
            filesystem {
              hash
            }
          }`;
        return Commit.find({
          selectionSet,
          where: {
            hash
          }
        }).then(result => {
          if (!result) {
            throw new Error(`Commit hash ${hash} doesn't exists !`);
          }
          return result[0]
        });
      }));
      // get root trees hash
      const [base_root_hash, diffee_root_hash] = arr_commit.map(com => com['filesystem']['hash']);
      // TODO: diff them recursively
      const diff_result = await diffTreesRecursive(driver, ROOT_PATH, base_root_hash, diffee_root_hash);

      return {
        'newitems': diff_result['newitems_path'],
        'delitems': diff_result['delitems_path'],
        'moditems': diff_result['moditems_path']
      };
    }
  },
  Mutation: {
    async mergeTree(_source, {input}) {
      const session = driver.session()
      const prom = session.writeTransaction(tx => {
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
      } finally{
        session.close()
      }
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
