#!/usr/bin/env node

import dotenv from "dotenv";

dotenv.config();

export const defaultConfig = {
  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017",
  databaseName: process.env.DATABASE_NAME,
  seedsDir: process.env.SEEDS_DIR || "seeds",
  clear: process.env.CLEAR === "true",
  verbose: process.env.VERBOSE === "true",
};
