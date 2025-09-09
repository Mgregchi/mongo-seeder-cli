#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { MongoClient } from "mongodb";
import { validateOptions } from "./utils/validation.js";

export async function seedDatabase(options) {
  const validationErrors = validateOptions(options);
  if (validationErrors.length > 0) {
    validationErrors.forEach((e) => console.error("❌ " + e));
    process.exit(1);
  }

  const seedsDirPath = path.resolve(process.cwd(), options.seedsDir);

  const client = new MongoClient(options.mongoUri);

  try {
    await client.connect();
    if (options.verbose) {
      console.log(`✅ Connected to MongoDB at ${options.mongoUri}`);
    }

    const db = client.db(options.databaseName);

    const jsonFiles = await getJsonFilesRecursively(seedsDirPath);
    if (jsonFiles.length === 0) {
      console.log("⚠️ No JSON seed files found.");
      return;
    }

    for (const filePath of jsonFiles) {
      let collectionName = path
        .relative(seedsDirPath, filePath)
        .replace(/\\/g, "/")
        .replace(/\//g, "_")
        .replace(/\.json$/, "");

      if (options.verbose) {
        console.log(`📥 Seeding '${collectionName}' from ${filePath}`);
      }

      const fileContent = await fs.promises.readFile(filePath, "utf-8");

      let documents;
      try {
        documents = JSON.parse(fileContent);
      } catch (e) {
        console.error(`❌ Failed to parse ${filePath}:`, e.message);
        continue;
      }

      if (!Array.isArray(documents)) {
        console.error(`❌ ${filePath} must contain a JSON array. Skipping.`);
        continue;
      }

      const collection = db.collection(collectionName);

      if (options.clear) {
        if (options.verbose) {
          console.log(`🧹 Clearing '${collectionName}'`);
        }
        await collection.deleteMany({});
      }

      const result = await collection.insertMany(documents);
      console.log(
        `✅ Inserted ${result.insertedCount} docs into '${collectionName}'`
      );
    }
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  } finally {
    await client.close();
  }
}

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
