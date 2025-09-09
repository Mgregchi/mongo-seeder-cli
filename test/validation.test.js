import { describe, it, expect } from "vitest";
import { validateOptions } from "../src/utils/validation.js";

describe("validateOptions", () => {
  it("should detect missing or invalid options", () => {
    const errors = validateOptions({
      mongoUri: "invalid-uri",
      databaseName: "",
      seedsDir: "./nonexistent",
    });
    expect(errors.length).toBeGreaterThan(0);
  });

  it("should pass valid options", () => {
    const errors = validateOptions({
      mongoUri: "mongodb://localhost:27017",
      databaseName: "test",
      seedsDir: "seeds", // Make sure this exists
    });
    expect(errors.length).toBe(0);
  });
});
