import { sqliteTableCreator, text } from "drizzle-orm/sqlite-core";

const table = sqliteTableCreator((name) => `fixture_${name}`);

export const userTable = table("user", {
  id: text("id").primaryKey(),
  name: text("name"),
});

export const postTable = table("post", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => userTable.id),
});
