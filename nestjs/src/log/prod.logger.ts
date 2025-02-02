import * as winston from 'winston';

export const prodWinstonLogger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf((info) => {
          return `[${info.level}] ${info.message} ${info?.stack ? '\n' + info?.stack : ''
            } - ${info.timestamp}`;
        }),
      ),
    }),
    new winston.transports.DailyRotateFile({
      dirname: 'logs',
      level: 'info',
      filename: 'dev-info-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.simple(),
      ),
    }),
    new winston.transports.DailyRotateFile({
      dirname: 'logs',
      level: 'error',
      filename: 'dev-error-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.simple(),
      ),
    }),
    new winston.transports.DailyRotateFile({
      dirname: 'logs',
      level: 'warn',
      filename: 'dev-warn-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.simple(),
      ),
    }),
  ],
});
