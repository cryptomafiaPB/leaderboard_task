import { ClaimHistory } from "../models/ClaimHistory.model";
import { ApiError } from "../utils/api-error";

export class claimHistoryService {
    static async getHistory(userId: string, page = 1, limit = 10) {
        const skip = (page - 1) * limit;

        const history = await ClaimHistory.find({ userId: userId })
            .sort({ claimedAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate('userId', 'username avatarUrl totalPoints')
            .exec();

        const total = await ClaimHistory.countDocuments({ userId: userId }).exec();

        return { history, total };
    }
}