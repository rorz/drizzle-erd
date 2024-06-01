import { getDbmlForSchema } from ".";
import * as pgExample from "./fixtures/pg-schema";

describe("Get DBML for a given schema", () => {
  it("transforms an example PG schema into DBML", () => {
    const expected = pgExample.DBML.trim();
    const actual = getDbmlForSchema(pgExample.schema, "ForeignKey");
    expect(actual).toEqual(expected);
  });
});
