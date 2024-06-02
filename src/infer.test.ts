import { inferSchemaVariant } from "./infer";
import { SchemaVariant } from "./types";

import * as basicFkPgSchema from "./fixtures/schemas/pg/basic-fk";
import * as basicFkMySqlSchema from "./fixtures/schemas/mysql/basic-fk";
import * as basicFkSQLiteSchema from "./fixtures/schemas/sqlite/basic-fk";
import * as basicMixedSchema from "./fixtures/schemas/mixed/basic";

describe("Drizzle ERD || Infer", () => {
  it("infers a basic Postgres schema", () => {
    const expected: SchemaVariant = "Postgres";
    const actual = inferSchemaVariant(basicFkPgSchema);
    expect(actual).toEqual(expected);
  });
  it("infers a basic MySQL schema", () => {
    const expected: SchemaVariant = "MySQL";
    const actual = inferSchemaVariant(basicFkMySqlSchema);
    expect(actual).toEqual(expected);
  });
  it("infers a basic SQLite schema", () => {
    const expected: SchemaVariant = "SQLite";
    const actual = inferSchemaVariant(basicFkSQLiteSchema);
    expect(actual).toEqual(expected);
  });
  it("fails when multiple variants detected", () => {
    expect(() => inferSchemaVariant(basicMixedSchema)).toThrow();
  });
  it("fails when no schema is detected", () => {
    expect(() =>
      inferSchemaVariant({
        abc: 123,
      })
    ).toThrow();
  });
});
