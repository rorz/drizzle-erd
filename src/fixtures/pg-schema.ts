import { pgTableCreator, text } from "drizzle-orm/pg-core";

const userTable = pgTableCreator((prefix) => prefix)("user", {
  id: text("id"),
});

export const schema = {
  userTable,
};

export const DBML = `
table user {
  id text
}
`;
