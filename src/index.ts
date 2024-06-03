#!/usr/bin/env node

import { writeFileSync } from "fs";
import { generateErd } from "./generate.js";
export { generateErd };

import { Command } from "commander";
const program = new Command();

program.description("Hello, ERD!");
program.option("--path <string>");
program.option("--verbose");
program.parse();

const options = program.opts();
console.log("OPTIONS:", JSON.stringify(options, null, 2));

const { svg } = await generateErd({
  schema: options.path,
  logStyle: options.verbose ? "Verbose" : undefined,
});
writeFileSync("test.svg", svg);
