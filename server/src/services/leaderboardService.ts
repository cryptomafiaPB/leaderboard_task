import { User } from '../models/User.model';
import { userService } from './userService';

export class leaderboardService {
    static async getLeaderboard(page = 1, limit = 10): Promise<{ data: any[]; total: number }> {
        const { users, total } = await userService.listUsers(page, limit);

        // Assign ranks, handling ties
        let currentRank = (page - 1) * limit + 1;
        let prevPoints: number | null = null;
        const data = users.map((u, idx) => {
            const rank = prevPoints === u.totalPoints ? currentRank - 1 : currentRank;
            prevPoints = u.totalPoints;
            currentRank++;
            return { _id: u._id, name: u.name, avatarUrl: u.avatarUrl, totalPoints: u.totalPoints, rank };
        });
        return { data, total };
    }

    static async getUserRank(userId: string): Promise<{ rank: number }> {
        // get total count of users
        const count = await User.countDocuments().exec();
        // get users (paginated) sorted by totalPoints
        const users = await User.find().sort({ totalPoints: -1 }).limit(count).exec();

        for (let idx = 0; idx < users.length; idx++) {
            if (users[idx]._id?.toString() === userId) {
                // account for ties
                const rank = idx + 1;
                return { rank };
            }
        }
        throw new Error('User not found');
    }
};