import { mysqlSchema, text } from "drizzle-orm/mysql-core";

const schema = mysqlSchema("fixture");

export const userTable = schema.table("user", {
  id: text("id").primaryKey(),
  name: text("name"),
});

export const postTable = schema.table("post", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => userTable.id),
});
