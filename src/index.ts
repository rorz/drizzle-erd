import * as examplePgSchema from "./fixtures/pg-schema";
import {
  mysqlGenerate,
  pgGenerate,
  sqliteGenerate,
} from "drizzle-dbml-generator";
import { run } from "@softwaretechnik/dbml-renderer";
import { PgTable } from "drizzle-orm/pg-core";
import { MySqlTable } from "drizzle-orm/mysql-core";
import { SQLiteTable } from "drizzle-orm/sqlite-core";
import { logger, LogStyle } from "./utils/logger";

type InferredPgSchema = Record<string, PgTable>;
type InferredMySqlSchema = Record<string, MySqlTable>;
type InferredSQLiteSchema = Record<string, SQLiteTable>;

type SchemaVariant =
  | InferredPgSchema
  | InferredMySqlSchema
  | InferredSQLiteSchema;
type RelationMethod = "Explicit" | "ForeignKey";

interface DrizzleErdOpts {
  logStyle?: LogStyle;
  schema: SchemaVariant | string;
  relationMethod?: RelationMethod;
  outFile?: string;
}

export const getDbmlForSchema = (
  schema: SchemaVariant,
  relationMethod: RelationMethod
): string => {
  let relational = false; // All other methods default to false
  if (relationMethod === "Explicit") relational = true;

  if (Object.values(schema).every((item) => item instanceof PgTable)) {
    return pgGenerate({ schema, relational });
  }
  if (Object.values(schema).every((item) => item instanceof MySqlTable)) {
    return mysqlGenerate({ schema, relational });
  }

  throw new Error("Not supported");
};

const main = (opts: DrizzleErdOpts) => {
  let dbml: string;
  let relational: boolean;

  logger.setLogStyle(opts.logStyle ?? "Default");

  switch (opts.relationType) {
    case "explicit":
      relational = true;
      break;
    case "foreignKey":
    default:
      relational = false;
      break;
  }

  if (opts.schema instanceof PgSchema) {
    dbml = pgGenerate({
      schema: opts.schema,
      relational,
    });
  } else if (opts.schema instanceof MySqlSchema) {
    dbml = mysqlGenerate({
      schema: opts.schema,
      relational,
    });
  }

  // TODO

  return dbml;
};

console.info("⏳ Generating DBML");
const dbml = pgGenerate({
  schema: {},
});

console.info("✅ Generated DBML successfully!");
console.info(dbml);
console.log("Genning SVG:");
// const outputSVG = run(dbml, "svg");
// console.log(outputSVG);
