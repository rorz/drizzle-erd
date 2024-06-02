import * as basicPgSchema from "./fixtures/schemas/pg/basic-fk";
import { resolveSchemaAt } from "./resolve";

describe("Drizzle ERD || Resolve", () => {
  it("resolves a basic PG schema path to its object form", async () => {
    const expected = basicPgSchema;
    const actual = await resolveSchemaAt("./fixtures/schemas/pg/basic-fk.ts");
    expect(actual).toMatchObject(expected);
  });
});
