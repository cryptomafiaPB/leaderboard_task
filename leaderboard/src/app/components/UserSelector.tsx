import React from 'react';
import { type User } from '../api/api';
import { useLeaderboardContext } from '../context/useLeaderboardContext';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';

interface UserSelectorProps {
    selectedId: string | null;
    onSelect: (id: string) => void;
}

const UserSelector: React.FC<UserSelectorProps> = ({ selectedId, onSelect }) => {
    const { allUsers } = useLeaderboardContext();

    console.log('allUsers', allUsers);

    if (allUsers === undefined) return <div>Loading users…</div>;

    if (!allUsers) return <div>Loading users…</div>;

    return (

        <Select
            value={selectedId ?? ''}
            onValueChange={(value) => onSelect(value)}
        >
            <SelectTrigger className="w-[180px] sm:w-40 p-4 cursor-pointer border rounded focus:outline-none focus:ring text-black bg-white font-bold">
                <SelectValue placeholder="Select a user" />
            </SelectTrigger>
            <SelectContent className="bg-white text-black">
                {allUsers && allUsers.map((u: User) => (
                    <SelectItem key={u._id} value={u._id} className='p-2 hover:bg-gray-100 cursor-pointer'>
                        {u.name} ({u.totalPoints} pts)
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default UserSelector;
