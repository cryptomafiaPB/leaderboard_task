import { leaderboardService } from './leaderboardService';
import { io } from '../server';
import { randomInt } from '../utils/random';
import { ClaimHistory } from '../models/ClaimHistory.model';
import { User } from '../models/User.model';

export const claimService = {
    async claimPoints(userId: string): Promise<{ points: number; newTotal: number; rank: number }> {
        // 1. generate random points
        const points = randomInt(1, 10);

        // 2. create claim history
        // await claimHistoryRepo.create(userId, points);
        const claimHistory = await ClaimHistory.create({ userId: userId, points });

        // 3. update user total
        // @ts-ignore
        const newTotal = await User.incrementPoints(userId, points);

        // 4. recompute rank
        const { rank } = await leaderboardService.getUserRank(userId);

        // 5. emit real time update
        io.of('/leaderboard').emit('leaderboard-update', { userId, points, newTotal, rank, timestamp: new Date() });

        return { points, newTotal, rank };
    },
};