import { mysqlSchema, text as mySqlText } from "drizzle-orm/mysql-core";
import { pgSchema, text as pgText } from "drizzle-orm/pg-core";

const baseMysqlSchema = mysqlSchema("fixture");
const basePgSchema = pgSchema("fixture");

export const userTable = baseMysqlSchema.table("user", {
  id: mySqlText("id").primaryKey(),
  name: mySqlText("name"),
});

export const postTable = baseMysqlSchema.table("post", {
  id: mySqlText("id").primaryKey(),
  userId: mySqlText("user_id").references(() => userTable.id),
});

export const anotherTable = basePgSchema.table("another", {
  id: pgText("id").primaryKey(),
  name: pgText("name"),
});
