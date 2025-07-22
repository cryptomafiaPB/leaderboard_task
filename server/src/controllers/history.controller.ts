import { Request, Response, NextFunction } from 'express';
import { claimService } from '../services/claimService';
import { ApiResponce } from '../utils/api-responce';
import logger from '../utils/logger';
import { claimHistoryService } from '../services/claimHistoryService';

export const historyById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        logger.info("historyById");
        const { id: userId } = req.params; // get user id from params
        const result = await claimHistoryService.getHistory(userId); // claim points
        res.status(200).json(new ApiResponce(200, result, 'Points claimed successfully'));
    } catch (err) {
        next(err);
    }
};