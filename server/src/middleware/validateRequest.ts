import { NextFunction, Request, Response } from 'express';
import { ZodObject } from 'zod';

// validate request body, params and query
export const validateRequest = (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse({
            body: req.body,
            params: req.params,
            query: req.query,
        });
        next();
    } catch (err) { // if validation fails
        const error = err as any;
        return res.status(400).json({
            status: 'error',
            errors: error.format(),
        });
    }
};