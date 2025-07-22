import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { useLeaderboardContext } from '../context/LeaderboardContext';
import { type User } from '../api/api';

export const useLeaderboard = () => {
    const { page, limit, fetchPage, addOrUpdateUser } = useLeaderboardContext();

    useEffect(() => {
        // Initial fetch
        fetchPage(page);
    }, [page]);

    useEffect(() => {
        // Connect to your namespace
        const socket: Socket = io(import.meta.env.VITE_API_BASE_URL?.replace(/^http/, 'ws') + '/leaderboard', {
            transports: ['websocket'],
        });

        socket.on('connect', () => {
            console.log('Socket connected:', socket.id);
        });

        socket.on('leaderboard-update', (payload: { userId: string; points: number; newTotal: number; rank: number }) => {
            // Map payload to User shape
            const updated: User = {
                _id: payload.userId,
                name: '',           // name is unknown here; frontend could look it up in current list
                avatarUrl: '',
                totalPoints: payload.newTotal,
                rank: payload.rank,
            };
            addOrUpdateUser(updated);
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
