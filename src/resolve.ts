import { resolve } from "path";
import { require } from "tsx/cjs/api";

export const resolveSchemaAt = async (
  filepath: string
): Promise<Record<string, unknown>> => {
  const absolutePath = resolve(filepath);
  return require(absolutePath, import.meta.url);
};
