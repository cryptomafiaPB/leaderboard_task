import http from 'http';
import app from './app';
import { env } from './config/env';
import logger from './utils/logger';
import mongoose from 'mongoose';
import { Server as SocketIOServer } from 'socket.io';
import { connectDB } from './config/connectDB';

const server = http.createServer(app);
const io = new SocketIOServer(server, { cors: { origin: '*' } });

// Connect to Database (mongoDB)
connectDB();

// Start HTTP + Socket.io server
server.listen(env.PORT, () => {
    logger.info(`Server running on port ${env.PORT}`);
});

// Export io for socket handlers
export { io };