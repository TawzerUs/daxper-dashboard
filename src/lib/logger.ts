// Simple logging utility for DaxPer Dashboard

export enum LogLevel {
  ERROR = 'ERROR',
  WARN = 'WARN',
  INFO = 'INFO',
  SUCCESS = 'SUCCESS',
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  details?: any;
}

// Client-side logging (sends to console)
export function log(level: LogLevel, message: string, details?: any) {
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    details,
  };

  console.log(`[${entry.timestamp}] [${entry.level}] ${entry.message}`, details || '');
}

export function logError(message: string, details?: any) {
  log(LogLevel.ERROR, message, details);
}

export function logWarn(message: string, details?: any) {
  log(LogLevel.WARN, message, details);
}

export function logInfo(message: string, details?: any) {
  log(LogLevel.INFO, message, details);
}

export function logSuccess(message: string, details?: any) {
  log(LogLevel.SUCCESS, message, details);
}
