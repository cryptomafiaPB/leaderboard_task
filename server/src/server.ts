import http from 'http';
import app from './app';
import { env } from './config/env';
import logger from './utils/logger';
import { Server as SocketIOServer } from 'socket.io';
import { connectDB } from './config/connectDB';
import './sockets/leaderboardSocket';

const server = http.createServer(app); // create HTTP server
const io = new SocketIOServer(server, { cors: { origin: '*' } }); // create Socket.io server

// connect to Database (mongoDB)
connectDB();

// listen on port
server.listen(env.PORT, () => {
    logger.info(`Server running on port ${env.PORT}`);
});

// export io for socket handlers
export { io };