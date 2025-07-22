import React from 'react';
import { useLeaderboardContext } from '../context/LeaderboardContext';

const LeaderboardList = () => {
    const { users, loading, error } = useLeaderboardContext();

    if (loading) return <div className="text-center py-4">Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <ul className="space-y-2">
            {users.map((u) => (
                <li
                    key={u._id}
                    className="flex items-center justify-between p-4 bg-white rounded shadow"
                >
                    <div className="flex items-center space-x-3">
                        <span className="text-lg font-bold">{u.rank}</span>
                        <img
                            src={u.avatarUrl || '/default-avatar.png'}
                            alt={u.name}
                            className="w-8 h-8 rounded-full"
                        />
                        <span className="font-medium">{u.name}</span>
                    </div>
                    <span className="text-xl font-semibold">{u.totalPoints}</span>
                </li>
            ))}
        </ul>
    );
};

export default LeaderboardList;
