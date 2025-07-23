"use client";
import { useContext } from 'react';
import { LeaderboardContext } from './LeaderboardContextObject';

export const useLeaderboardContext = () => {
    const ctx = useContext(LeaderboardContext);
    if (!ctx) throw new Error('useLeaderboardContext must be inside LeaderboardProvider');
    return ctx;
};