import mongoose from "mongoose";
import { env } from "./env";
import logger from "../utils/logger";

export const connectDB = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(env.MONGODB_URI!);
        logger.info('🗄️ Connected to MongoDB')
    } catch (error) {
        logger.error(`MongoDB connection error: ${error}`)
    }
};