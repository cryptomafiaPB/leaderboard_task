import { Request, Response, NextFunction } from 'express';
import { leaderboardService } from '../services/leaderboardService';
import { ApiResponce } from '../utils/api-responce';

export const getLeaderboard = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = Number(req.query.page) || 1; // get page number from query
        const limit = Number(req.query.limit) || 10; // get limit from query
        const { data, total } = await leaderboardService.getLeaderboard(page, limit); // get leaderboard
        res.status(200).json(new ApiResponce(200, { data, total }, 'Leaderboard fetched successfully'));
    } catch (err) {
        next(err);
    }
};