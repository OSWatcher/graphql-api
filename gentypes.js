import neo4j from "neo4j-driver";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import pkg from '@neo4j/graphql-ogm';
const { OGM, generate } = pkg;
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

// Neo4j driver instance
const driver = neo4j.driver(
    process.env.NEO4J_URI,
    neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);

// we must convert the file Buffer to a UTF-8 string
const typeDefs = fs.readFileSync("./type-defs.graphql").toString("utf-8");

// OGM instance
const ogm = new OGM({ typeDefs, driver });

// Function to initialize OGM and generate types
async function initAndGenerate() {
    await ogm.init();

    const outFile = path.join(__dirname, "src", "ogm-types.ts");

    await generate({
        ogm,
        outFile,
    });

    console.log("Types Generated");
}

// Execute the async function
initAndGenerate().catch(error => {
    console.error(error);
    process.exit(1);
});
