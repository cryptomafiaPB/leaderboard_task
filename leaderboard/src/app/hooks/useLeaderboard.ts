import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { createUser, type User } from '../api/api';
import { useLeaderboardContext } from '../context/useLeaderboardContext';

export const useLeaderboard = () => {
    const { page, limit, fetchPage } = useLeaderboardContext();

    useEffect(() => {
        // Initial fetch
        fetchPage(page);
    }, [page, fetchPage]);

    useEffect(() => {
        // Connect to your namespace
        const socket: Socket = io(process.env.VITE_API_BASE_URL! || "http://localhost:8800/api".replace(/^http/, 'ws') + '/leaderboard', {
            transports: ['websocket'],
        });

        socket.on('connect', () => {
            console.log('Socket connected:', socket.id);
        });

        socket.on('leaderboard-update', (payload: { userId: string; points: number; newTotal: number; rank: number }) => {
            // Map payload to User shape
            const updated: User = {
                _id: payload.userId,
                name: '',
                avatarUrl: '',
                totalPoints: payload.newTotal,
                rank: payload.rank,
            };
            createUser(updated.name, updated.avatarUrl);
        });

        socket.on('disconnect', () => {
            console.log('Socket disconnected');
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return { page, limit, fetchPage };
};
