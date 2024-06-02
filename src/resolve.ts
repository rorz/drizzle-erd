import { resolve } from "path";

export const resolveSchemaAt = async (
  filepath: string
): Promise<Record<string, unknown>> => {
  const absolutePath = resolve(filepath);
  return await import(absolutePath);
};
