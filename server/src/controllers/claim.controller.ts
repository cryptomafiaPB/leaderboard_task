import { Request, Response, NextFunction } from 'express';
import { claimService } from '../services/claimService';
import { ApiResponce } from '../utils/api-responce';
import logger from '../utils/logger';

export const claimPoints = async (req: Request, res: Response, next: NextFunction) => {
    try {
        logger.info("claimPoints");
        const { id: userId } = req.params; // get user id from params
        const result = await claimService.claimPoints(userId); // claim points
        res.status(200).json(new ApiResponce(200, result, 'Points claimed successfully'));
    } catch (err) {
        next(err);
    }
};