"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchLeaderboard, fetchUsers, type User } from '../api/api';
import { useEffect, useState, type ReactNode } from 'react';
import { LeaderboardContext } from './LeaderboardContextObject';
import { io, type Socket } from 'socket.io-client';

export const LeaderboardProvider = ({ children }: { children: ReactNode }) => {

    const [leaderboard, setLeaderboard] = useState<User[]>([]);
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const limit = 10;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch one page of leaderboard
    const fetchPage = async (newPage: number) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetchLeaderboard(newPage, limit);
            if (res.data.success) {
                setLeaderboard(res.data.data.data);
                setTotal(res.data.data.total);
                setPage(newPage);
            } else {
                throw new Error(res.data.message);
            }
        } catch (err: any) {
            setError(err.message || 'Failed to load leaderboard');
        } finally {
            setLoading(false);
        }
    };

    // Fetch full users list
    const fetchUser = async () => {
        try {
            const res = await fetchUsers(1, 10);
            setAllUsers(res.data.data.users);
        } catch (error: any) {
            setError(error.message || 'Failed to load users');
        }
    };

    // Initial load
    useEffect(() => {
        fetchPage(1);
        fetchUser();
    }, []);

    // Socket setup for live updates
    useEffect(() => {
        const socket: Socket = io(
            String(process.env.VITE_API_BASE_URL! || 'http://localhost:8800/api').replace(/^http/, 'ws') + '/leaderboard'
        );

        socket.on('connect', () => {
            console.log('Socket connected:', socket.id);
        });

        socket.on('leaderboard-update', () => {
            // Simply re-fetch everything on any update
            fetchPage(page);
            fetchUser();
        });

        return () => {
            socket.disconnect();
        };
    }, [page]);

    return (
        <LeaderboardContext.Provider
            value={{
                leaderboard,
                allUsers,
                total,
                page,
                limit,
                loading,
                error,
                fetchPage,
            }}
        >
            {children}
        </LeaderboardContext.Provider>
    );
};