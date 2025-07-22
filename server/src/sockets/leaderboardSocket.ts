import { Server } from 'socket.io';
import { io } from '../server';
import logger from '../utils/logger';

// namespace or default:
const leaderboardNamespace = io.of('/leaderboard');

// socket events
leaderboardNamespace.on('connection', (socket) => {
    logger.info(`🟢 socket connected: ${socket.id}`);

    // optionally handle client-sent events ('subscribe'):
    socket.on('subscribe', (data) => {
        logger.info(`Socket ${socket.id} subscribe: ${JSON.stringify(data)}`);
        // join rooms: socket.join(data.room);
    });

    socket.on('disconnect', (reason) => {
        logger.info(`🔴 socket disconnected: ${socket.id} (${reason})`);
    });
});