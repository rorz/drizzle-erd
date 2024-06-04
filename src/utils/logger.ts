export type LogStyle = "Verbose" | "Silent" | "Default";

type LogData = Record<string, unknown> | Array<Record<string, unknown>> | Error;

class Logger {
  private logStyle: LogStyle;

  constructor(logStyle?: LogStyle) {
    this.logStyle = logStyle ?? "Default";
  }

  setLogStyle(logStyle: LogStyle) {
    this.logStyle = logStyle;
  }

  createOutput(message: string, data?: LogData) {
    const output: [string, LogData?] = [`[drizzle-erd]: ${message}`];
    if (!data) return output;

    if (data instanceof Error) {
      output.push(data);
    }
    try {
      output.push(JSON.stringify(data, null, 2));
    } catch (_) {
      output.push(data);
    }

    return output;
  }

  debug(message: string, data?: LogData): void {
    if (this.logStyle === "Verbose") {
      const output = this.createOutput(message, data);
      console.debug(...output);
    }
  }

  log(message: string, data?: LogData): void {
    if (this.logStyle !== "Silent") {
      const output = this.createOutput(message, data);
      console.debug(...output);
    }
  }

  error(message: string, data?: LogData): void {
    if (this.logStyle !== "Silent") {
      const output = this.createOutput(message, data);
      console.error(...output);
    }
  }
}

export const logger = new Logger("Default");
