import test from "ava";
import util from "util";
import * as basicPgSchema from "./fixtures/schemas/pg/basic-fk.js";
import { resolveSchemaAt } from "./resolve.js";

function extractNestedKeys(obj: any): string[] {
  const keys: string[] = [];
  const visited = new Set();

  function recurse(currentObj: any) {
    if (visited.has(currentObj)) {
      return;
    }
    visited.add(currentObj);

    Object.keys(currentObj).forEach((key) => {
      keys.push(key);
      const value = currentObj[key];
      if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        recurse(value);
      }
    });
  }

  recurse(obj);
  return keys;
}

test("resolves a basic PG schema path to its object form", async (t) => {
  const expected = basicPgSchema;
  const actual = await resolveSchemaAt("./src/fixtures/schemas/pg/basic-fk.ts");

  // Sub-optimal for now, but can't use raw objects due to underlying differences
  t.deepEqual(extractNestedKeys(actual), extractNestedKeys(expected));
});
