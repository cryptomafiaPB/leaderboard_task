import express from 'express';
import { env } from 'process';
import logger from './utils/logger';

const app = express();

// Middleware
app.use(express.json());
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

export default app;