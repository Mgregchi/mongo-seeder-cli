#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { MongoClient } from "mongodb";
import { program } from "commander";

program
  .requiredOption("-d, --database-name <name>", "MongoDB database name")
  .option(
    "-u, --mongo-uri <uri>",
    "MongoDB connection URI",
    "mongodb://localhost:27017"
  )
  .option("-s, --seeds-dir <path>", "Seeds directory", "seeds")
  .option("-c, --clear", "Clear collections before inserting", false)
  .option("-v, --verbose", "Verbose logging", false);

program.parse(process.argv);

const options = program.opts();

async function getJsonFilesRecursively(dir) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const res = path.resolve(dir, entry.name);
      if (entry.isDirectory()) {
        return getJsonFilesRecursively(res);
      } else if (entry.isFile() && res.endsWith(".json")) {
        return [res];
      } else {
        return [];
      }
    })
  );
  return files.flat();
}

async function main() {
  const seedsDirPath = path.resolve(process.cwd(), options.seedsDir);

  if (!fs.existsSync(seedsDirPath)) {
    console.error(`Seeds directory not found at ${seedsDirPath}`);
    process.exit(1);
  }

  const client = new MongoClient(options.mongoUri);

  try {
    await client.connect();
    if (options.verbose) {
      console.log(`Connected to MongoDB at ${options.mongoUri}`);
    }

    const db = client.db(options.databaseName);

    const jsonFiles = await getJsonFilesRecursively(seedsDirPath);
    if (jsonFiles.length === 0) {
      console.log("No JSON seed files found.");
      return;
    }

    for (const filePath of jsonFiles) {
      // collection name is relative path from seedsDir, with slashes replaced by underscores, minus .json
      let collectionName = path
        .relative(seedsDirPath, filePath)
        .replace(/\\/g, "/")
        .replace(/\//g, "_");
      collectionName = collectionName.replace(/\.json$/, "");

      if (options.verbose) {
        console.log(
          `Seeding collection '${collectionName}' from file ${filePath}`
        );
      }

      const fileContent = await fs.promises.readFile(filePath, "utf-8");

      let documents;
      try {
        documents = JSON.parse(fileContent);
      } catch (e) {
        console.error(`Failed to parse JSON in ${filePath}:`, e);
        continue;
      }

      if (!Array.isArray(documents)) {
        console.error(
          `File ${filePath} does not contain a JSON array. Skipping.`
        );
        continue;
      }

      const collection = db.collection(collectionName);

      if (options.clear) {
        if (options.verbose) {
          console.log(`Clearing collection '${collectionName}' before insert`);
        }
        await collection.deleteMany({});
      }

      const result = await collection.insertMany(documents);

      console.log(
        `Inserted ${result.insertedCount} docs into '${collectionName}'`
      );
    }
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  } finally {
    await client.close();
  }
}

main();
