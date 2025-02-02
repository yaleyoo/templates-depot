import * as winston from 'winston';
import 'winston-daily-rotate-file';

export const devWinstonLogger = winston.createLogger({
  level: 'debug',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.printf((info) => {
          return `[${info.level}] ${info.message} ${info?.stack ? '\n' + info?.stack : ''
            } - ${info.timestamp}`;
        }),
      ),
    })
  ],
});
