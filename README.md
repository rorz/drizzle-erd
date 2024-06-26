<p align="center">
  <img src="./drizzle-erd-logo.png" width=128 />
  <h1 align="center">Drizzle ERD</h1>
</p>

> A super-simple way to generate Entity-Relationship Diagrams (ERDs) from your Drizzle schema. Use case (CLI or in-code) and dialect (PG, MySQL, SQLite) agnostic!

[![Tests](https://github.com/rorz/drizzle-erd/actions/workflows/tests.yaml/badge.svg)](https://github.com/rorz/drizzle-erd/actions/workflows/tests.yaml)
[![Downloads](https://badgen.net/npm/dt/drizzle-erd)](https://www.npmjs.com/package/drizzle-erd)

> [!IMPORTANT]
> Drizzle ERD is in **pre-release** and is not ready for production-reliant use cases.

## Alpha usage

If you'd like to use this package right now, in lieu of any proper documentation, here's how to get started.

### CLI

Call `drizzle-erd` directly from `npm` or `pnpm` from a script in your `package.json` like so:

```jsonc
{
  //...Rest of package.json
  "scripts": {
    //...Other scripts
    "db:generate-erd": "drizzle-erd --in ./src/or/path/to/schema.ts --out erd.svg"
  }
}
```

### Options

The following CLI flags are available to be used with `drizzle-erd`.

| Name                            | Flag        | Description                                                                              |
| ------------------------------- | ----------- | ---------------------------------------------------------------------------------------- |
| [Required] <br /> Schema source | `--in`      | The path to your Drizzle `schema.ts` file.                                               |
| [Required] <br /> SVG output    | `--out`     | The destination path (and filename) of the output SVG. (Overwrites if already exists)    |
| Debug logs                      | `--verbose` | Provide this flag to print the status of the schema generation with debug-level logging. |

### Add your ERD to your README

Add your ERD to your readme like this:

```md
<img src="./erd.svg" width=720 />
```

<img src="./erd.svg" width=720 />

### Make it all automatic

Call the `db:generate-erd` script you defined earlier from a Git `pre-commit` hook to make sure your generated ERD is always up-to-date (especially if you're printing it out to your README as above).
