import React from 'react';
import { useLeaderboardContext } from '../context/LeaderboardContext';
import { type User } from '../api/api';

interface UserSelectorProps {
    selectedId: string | null;
    onSelect: (id: string) => void;
}

const UserSelector: React.FC<UserSelectorProps> = ({ selectedId, onSelect }) => {
    const { users } = useLeaderboardContext();

    return (
        <select
            value={selectedId ?? ''}
            onChange={(e) => onSelect(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring"
        >
            <option value="" disabled>
                Select a user
            </option>
            {users.map((u: User) => (
                <option key={u._id} value={u._id}>
                    {u.name} (Rank #{u.rank})
                </option>
            ))}
        </select>
    );
};

export default UserSelector;
