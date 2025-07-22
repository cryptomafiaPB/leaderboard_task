import { Request, Response, NextFunction } from 'express';
import { leaderboardService } from '../services/leaderboardService';

export const getLeaderboard = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = Number(req.query.page) || 1; // get page number from query
        const limit = Number(req.query.limit) || 10; // get limit from query
        const { data, total } = await leaderboardService.getLeaderboard(page, limit); // get leaderboard
        res.json({ data, total });
    } catch (err) {
        next(err);
    }
};