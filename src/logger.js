import winston from 'winston';
const { combine, timestamp, json, printf } = winston.format;

const logger = winston.createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        json(),
        printf(({ timestamp, level, message, stack }) => {
            return `${timestamp} ${level}: ${message} ${stack || ''}`;
        })

    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

export default logger;
