import { createLogger, format, transports } from 'winston';
const { combine, timestamp, printf, colorize } = format;

// define log format
const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
});

const logger = createLogger({
    level: 'info',
    format: combine(
        colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        logFormat
    ),
    transports: [
        new transports.Console(),
    ],
    exitOnError: false,
});

export default logger;