import util from "util";
import { ProvidedSchema, SchemaVariant } from "./types.js";
import { assert } from "./utils/assert.js";

const onlyOne = (value: unknown, array: unknown[]) =>
  array.filter((v) => v === value).length === 1;

export const inferSchemaVariant = (schema: ProvidedSchema): SchemaVariant => {
  const objectDump = util.inspect(schema);

  const containsPgTable = objectDump.includes("PgTable");
  const containsMySqlTable = objectDump.includes("MySqlTable");
  const containsSQLiteTable = objectDump.includes("SQLiteTable");

  const containsResults = [
    containsPgTable,
    containsMySqlTable,
    containsSQLiteTable,
  ];

  assert(
    containsResults.some((v) => !!v),
    "Could not find any tables with a supported type (PG / MySQL / SQLite)"
  );
  assert(
    onlyOne(true, containsResults),
    "Seems to contain multiple table types (PG / MySQL / SQLite)"
  );

  if (containsPgTable) return "Postgres";
  if (containsMySqlTable) return "MySQL";
  if (containsSQLiteTable) return "SQLite";

  throw new Error("Unable to determine schema type (PG / MySQL / SQLite)");
};
