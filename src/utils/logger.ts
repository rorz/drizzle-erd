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

  debug(message: string, data?: LogData): void {
    if (this.logStyle === "Verbose") {
      console.debug(message, data);
    }
  }

  log(message: string, data?: LogData): void {
    if (this.logStyle !== "Silent") {
      console.debug(message, data);
    }
  }

  error(message: string, data?: LogData): void {
    if (this.logStyle !== "Silent") {
      console.error(message, data);
    }
  }
}

export const logger = new Logger("Default");
