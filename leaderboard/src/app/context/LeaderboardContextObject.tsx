"use client";
import { createContext } from 'react';
import { type User } from '../api/api';

export interface LeaderboardContextType {
    leaderboard: User[];     // current page
    allUsers: User[];        // full list
    total: number;           // total count for pagination
    page: number;
    limit: number;
    loading: boolean;
    error: string | null;
    fetchPage: (page: number) => Promise<void>;
}

export const LeaderboardContext = createContext<LeaderboardContextType | undefined>(undefined);