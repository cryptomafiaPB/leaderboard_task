import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    avatarUrl?: string;
    totalPoints: number;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
    {
        name: { type: String, required: true, trim: true },
        avatarUrl: { type: String, default: '' },
        totalPoints: { type: Number, default: 0, index: true },
    },
    { timestamps: true }
);

//  helper to increment points
UserSchema.statics.incrementPoints = async function (
    userId: string,
    points: number
): Promise<number> {
    const user = await this.findByIdAndUpdate(
        userId,
        { $inc: { totalPoints: points } },
        { new: true }
    );
    if (!user) throw new Error('User not found');
    return user.totalPoints;
};

export const User = model<IUser>('User', UserSchema);