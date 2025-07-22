import { IUser, User } from '../models/User.model';
import { ApiError } from '../utils/api-error';

export class userService {
    static async listUsers(page = 1, limit = 10): Promise<{ users: IUser[]; total: number }> {
        const skip = (page - 1) * limit;

        const users = await User.find()
            .sort({ totalPoints: -1 }) // sort by totalPoints in descending order
            .skip(skip) // skip number of documents
            .limit(limit) // limit number of documents
            .exec();

        if (!users) throw new ApiError(404, 'Users not found');

        const total = await User.countDocuments().exec();

        return { users, total };
    }

    static async createUser(name: string, avatarUrl?: string): Promise<IUser> {
        if (!name) throw new Error('Name is required');
        const user = await User.create({ name, avatarUrl });

        if (!user) throw new ApiError(500, 'Error creating user');

        return user;
    }
};