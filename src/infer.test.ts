import test from "ava";
import { inferSchemaVariant } from "./infer.js";
import { SchemaVariant } from "./types.js";

import * as basicFkPgSchema from "./fixtures/schemas/pg/basic-fk.js";
import * as basicFkMySqlSchema from "./fixtures/schemas/mysql/basic-fk.js";
import * as basicFkSQLiteSchema from "./fixtures/schemas/sqlite/basic-fk.js";
import * as basicMixedSchema from "./fixtures/schemas/mixed/basic.js";

test("infers a basic Postgres schema", (t) => {
  const expected: SchemaVariant = "Postgres";
  const actual = inferSchemaVariant(basicFkPgSchema);
  t.is(actual, expected);
});
test("infers a basic MySQL schema", (t) => {
  const expected: SchemaVariant = "MySQL";
  const actual = inferSchemaVariant(basicFkMySqlSchema);
  t.is(actual, expected);
});
test("infers a basic SQLite schema", (t) => {
  const expected: SchemaVariant = "SQLite";
  const actual = inferSchemaVariant(basicFkSQLiteSchema);
  t.is(actual, expected);
});
test("fails when multiple variants detected", (t) => {
  t.throws(() => inferSchemaVariant(basicMixedSchema));
});
test("fails when no schema is detected", (t) => {
  t.throws(() =>
    inferSchemaVariant({
      abc: 123,
    })
  );
});
