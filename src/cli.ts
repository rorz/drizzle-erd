#!/usr/bin/env node

import { writeFileSync } from "fs";
import { Command } from "commander";

import { generateErd } from "./generate.js";
import { assert } from "./utils/assert.js";
import { resolveSchemaAt } from "./resolve.js";

const program = new Command();

program.description("Hello, ERD!");
program.option("--in <string>");
program.option("--out <string>");
program.option("--verbose");
program.parse();

const options = program.opts();
const { out: pathOut, in: pathIn, verbose: isVerbose } = options;

assert(
  !!pathIn && typeof pathIn === "string",
  "Must specify a path for your schema via the '--in' flag"
);
assert(
  !!pathOut && typeof pathOut === "string",
  "Must specify a path for an output SVG via the '--out' flag"
);

const run = async () => {
  const schema = await resolveSchemaAt(pathIn);

  const { svg } = await generateErd({
    schema,
    logStyle: isVerbose ? "Verbose" : undefined,
  });
  writeFileSync(pathOut, svg);
};

void run();
