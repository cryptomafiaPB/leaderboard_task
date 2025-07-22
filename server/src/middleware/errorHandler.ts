import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';

export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    // logger in development
    logger.error(err.stack || err.message || err);

    const status = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({
        status: 'error',
        message,
    });
}