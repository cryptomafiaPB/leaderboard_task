import rateLimit from 'express-rate-limit';
import { env } from '../config/env';

export const claimRateLimiter = rateLimit({
    windowMs: env.RATE_LIMIT_WINDOW_MS, //  60000 ms
    max: env.RATE_LIMIT_MAX,          // 10 requests per window
    message: {
        status: 'error',
        message: `Too many claims; please try again later.`,
    },
});