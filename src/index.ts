import { logger, LogStyle } from "./utils/logger";
import { resolveSchemaAt } from "./resolve";
import { ProvidedSchema, RelationMethod } from "./types";
import { inferSchemaVariant } from "./infer";
import { generateDbml } from "./dbml";
import { generateSvg } from "./svg";

interface DrizzleErdOpts {
  logStyle?: LogStyle;
  schema: ProvidedSchema | string;
  relationMethod?: RelationMethod;
  outFile?: string;
}

interface DrizzleErdResult {
  dbml: string;
  svg: string;
}

export const generateErd = async ({
  schema: schemaOrPath,
  relationMethod = "ForeignKey",
  logStyle = "Default",
  outFile,
}: DrizzleErdOpts): Promise<DrizzleErdResult> => {
  logger.setLogStyle(logStyle);

  try {
    const isAPath = typeof schemaOrPath === "string";
    const resolvedSchema: ProvidedSchema = isAPath
      ? await resolveSchemaAt(schemaOrPath)
      : schemaOrPath;

    const schemaVariant = inferSchemaVariant(resolvedSchema);

    logger.debug("⚪️ Generating DBML");
    const dbml = generateDbml(resolvedSchema, schemaVariant, relationMethod);
    logger.debug("🟢 Generated DBML");

    logger.debug("⚪️ Generating SVG");
    const svg = generateSvg(dbml);
    logger.debug("🟢 Generated SVG");

    logger.debug("✅ ERD generated successfully");
    return { dbml, svg };
  } catch (error) {
    logger.error(
      "🔴 Generating ERD failed with error:",
      error instanceof Error ? error : { error: "UNKNOWN" }
    );
    throw error;
  }
};
