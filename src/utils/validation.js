#!/usr/bin/env node

import fs from "fs";

export function validateOptions(options) {
  const errors = [];

  if (!/^mongodb(?:\+srv)?:\/\//.test(options.mongoUri)) {
    errors.push("Invalid MongoDB URI.");
  }

  if (!options.databaseName || typeof options.databaseName !== "string") {
    errors.push("Database name must be a non-empty string.");
  }

  if (!fs.existsSync(options.seedsDir)) {
    errors.push(`Seeds directory not found at path: ${options.seedsDir}`);
  }

  return errors;
}
