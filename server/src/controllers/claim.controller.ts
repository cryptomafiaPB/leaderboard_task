import { Request, Response, NextFunction } from 'express';
import { claimService } from '../services/claimService';

export const claimPoints = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id: userId } = req.params; // get user id from params
        const result = await claimService.claimPoints(userId); // claim points
        res.json(result);
    } catch (err) {
        next(err);
    }
};