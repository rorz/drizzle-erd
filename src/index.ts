#!/usr/bin/env node

import { writeFileSync } from "fs";
import { generateErd } from "./generate.js";
export { generateErd };

import { Command } from "commander";
import { assert } from "./utils/assert.js";
const program = new Command();

program.description("Hello, ERD!");
program.option("--in <string>");
program.option("--out <string>");
program.option("--verbose");
program.parse();

const options = program.opts();
const { out: pathOut, in: pathIn, verbose: isVerbose } = options;

assert(!!pathIn, "Must specify a path for your schema via the '--in' flag");
assert(!!pathOut, "Must specify a path for an output SVG via the '--out' flag");

const { svg } = await generateErd({
  schema: pathIn,
  logStyle: isVerbose ? "Verbose" : undefined,
});
writeFileSync(pathOut, svg);
