import { leaderboardService } from './leaderboardService';
import { io } from '../server';
import { randomInt } from '../utils/random';
import { ClaimHistory } from '../models/ClaimHistory.model';
import { User } from '../models/User.model';
import { ApiError } from '../utils/api-error';

export const claimService = {
    async claimPoints(userId: string): Promise<{ points: number; newTotal: number; rank: number }> {
        if (!userId) throw new Error('User id is required');

        // 1. generate random points
        const points = randomInt(1, 10);
        if (!points) throw new ApiError(500, 'Error generating random points');

        // 2. create claim history
        // await claimHistoryRepo.create(userId, points);
        const claimHistory = await ClaimHistory.create({ userId: userId, points });
        if (!claimHistory) throw new ApiError(500, 'Error creating claim history');

        // 3. update user total
        // @ts-ignore
        const newTotal = await User.incrementPoints(userId, points);
        if (!newTotal) throw new ApiError(500, 'Error updating user total');

        // 4. recompute rank
        const { rank } = await leaderboardService.getUserRank(userId);
        if (!rank) throw new ApiError(500, 'Error computing rank');

        // 5. emit real time update
        io.of('/leaderboard').emit('leaderboard-update', { userId, points, newTotal, rank, timestamp: new Date() });

        return { points, newTotal, rank };
    },
};