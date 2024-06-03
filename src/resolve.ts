import { resolve } from "path";
import { tsImport } from "tsx/esm/api";

export const resolveSchemaAt = async (
  filepath: string
): Promise<Record<string, unknown>> => {
  const absolutePath = resolve(filepath);
  return tsImport(absolutePath, import.meta.url);
};
