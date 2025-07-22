import { fetchLeaderboard } from '../api/api';
import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { type User } from '../api/api';

interface LeaderboardContextType {
    users: User[];
    total: number;
    page: number;
    limit: number;
    loading: boolean;
    error: string | null;
    fetchPage: (page: number) => void;
    addOrUpdateUser: (updated: User) => void;
}

const LeaderboardContext = createContext<LeaderboardContextType | undefined>(undefined);

export const LeaderboardProvider = ({ children }: { children: ReactNode }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const limit = 10; // or make dynamic
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const addOrUpdateUser = (updated: User) => {
        setUsers((prev) => {
            const exists = prev.find((u) => u._id === updated._id);
            if (exists) {
                return prev.map((u) => (u._id === updated._id ? updated : u));
            }
            // new users appear at top of this page if rank in here
            return [updated, ...prev].slice(0, limit);
        });
    };

    const fetchPage = async (newPage: number) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetchLeaderboard(newPage, limit);
            if (res.data.success) {
                setUsers(res.data.data.data);
                setTotal(res.data.data.total);
                setPage(newPage);
            } else {
                setError(res.data.message);
            }
        } catch (err: any) {
            setError(err.message || 'Error fetching leaderboard');
        } finally {
            setLoading(false);
        }
    };

    return (
        <LeaderboardContext.Provider
      value= {{ users, total, page, limit, loading, error, fetchPage, addOrUpdateUser }
}
    >
    { children }
    </LeaderboardContext.Provider>
  );
};

export const useLeaderboardContext = () => {
    const ctx = useContext(LeaderboardContext);
    if (!ctx) throw new Error('useLeaderboardContext must be inside LeaderboardProvider');
    return ctx;
};
