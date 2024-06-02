import { run } from "@softwaretechnik/dbml-renderer";

export const generateSvg = (dbml: string): string => {
  const svg = run(dbml, "svg");
  return svg;
};
