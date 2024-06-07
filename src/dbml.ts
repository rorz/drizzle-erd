import {
  mysqlGenerate,
  pgGenerate,
  sqliteGenerate,
} from "@rorz/drizzle-dbml-generator";
import { ProvidedSchema, RelationMethod, SchemaVariant } from "./types.js";

export const generateDbml = (
  schema: ProvidedSchema,
  variant: SchemaVariant,
  relationMethod: RelationMethod
): string => {
  let relational = false; // All other methods default to false
  if (relationMethod === "Explicit") relational = true;

  switch (variant) {
    case "Postgres":
      return pgGenerate({ schema, relational });
    case "MySQL":
      return mysqlGenerate({ schema, relational });
    case "SQLite":
      return sqliteGenerate({ schema, relational });
  }
};
