import { Schema, model, Document, Types } from 'mongoose';

export interface IClaimHistory extends Document {
    userId: Types.ObjectId;
    points: number;
    claimedAt: Date;
}

// claim history schema
const ClaimHistorySchema = new Schema<IClaimHistory>(
    {
        // user id
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },
        points: { type: Number, required: true },
        claimedAt: { type: Date, default: Date.now, index: true },
    },
    { versionKey: false } // remove __v field
);

export const ClaimHistory = model<IClaimHistory>(
    'ClaimHistory',
    ClaimHistorySchema
);