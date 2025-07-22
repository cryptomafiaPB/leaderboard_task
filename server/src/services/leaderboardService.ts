import { User } from '../models/User.model';
import { ApiError } from '../utils/api-error';
import { userService } from './userService';

export class leaderboardService {
    static async getLeaderboard(page = 1, limit = 10): Promise<{ data: any[]; total: number }> {
        const { users, total } = await userService.listUsers(page, limit); // get users

        // assign ranks, handling ties
        let currentRank = (page - 1) * limit + 1;
        let prevPoints: number | null = null;
        const data = users.map((u, idx) => { // iterate over users
            const rank = prevPoints === u.totalPoints ? currentRank - 1 : currentRank; //
            prevPoints = u.totalPoints; // update prevPoints
            currentRank++; // increment currentRank
            return { _id: u._id, name: u.name, avatarUrl: u.avatarUrl, totalPoints: u.totalPoints, rank };
        });
        return { data, total };
    }

    static async getUserRank(userId: string): Promise<{ rank: number }> {
        // get total count of users
        const count = await User.countDocuments().exec();
        if (!count) throw new ApiError(404, 'Error computing rank');

        // get users (paginated) sorted by totalPoints
        const users = await User.find().sort({ totalPoints: -1 }).limit(count).exec();
        if (!users) throw new ApiError(404, 'Error computing rank');

        for (let idx = 0; idx < users.length; idx++) {
            if (users[idx]._id?.toString() === userId) { // user found 
                // assign rank
                const rank = idx + 1;
                return { rank };
            }
        }
        throw new Error('User not found');
    }
};