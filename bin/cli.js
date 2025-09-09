#!/usr/bin/env node

import { program } from "commander";
import { seedDatabase } from "../src/seeder.js";
import { defaultConfig } from "../src/config.js";

program
  .option(
    "-u, --mongo-uri <uri>",
    "MongoDB connection URI",
    defaultConfig.mongoUri
  )
  .requiredOption(
    "-d, --database-name <name>",
    "Database name",
    defaultConfig.databaseName
  )
  .option("-s, --seeds-dir <dir>", "Seeds directory", defaultConfig.seedsDir)
  .option("-c, --clear", "Clear existing collections", defaultConfig.clear)
  .option("-v, --verbose", "Verbose output", defaultConfig.verbose);

program.parse(process.argv);
const options = program.opts();

await seedDatabase(options);
