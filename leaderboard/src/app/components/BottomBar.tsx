import React from 'react';
import { type User } from '../api/api';
import { useLeaderboardContext } from '../context/useLeaderboardContext';
import Image from 'next/image';

interface BottomBarProps {
    userId: string | null;
    users: User[];
}

const BottomBar: React.FC<BottomBarProps> = ({ userId }) => {

    const { allUsers } = useLeaderboardContext();
    const user = allUsers.find((u) => u._id === userId);
    if (!Array.isArray(user)) return null;

    return (
        <div className="fixed bottom-0 sm:relative sm:border-t-0 sm:shadow-none p-4 bg-white max-w-md mx-auto">
            {user ? (
                <>
                    <div className="flex items-center space-x-3">
                        <Image
                            width={32}
                            height={32}
                            src={user.avatarUrl || '/default-avatar.png'}
                            alt={user.name}
                            className="w-10 h-10 rounded-full"
                        />
                        <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-gray-500">
                                Rank #{user.rank} • {user.totalPoints} pts
                            </div>
                        </div>
                    </div>
                    {/* Optionally: a quick claim button here */}
                </>
            ) : (
                <div className="text-gray-600">Select a user to claim points</div>
            )}
        </div>
    );
};

export default BottomBar;
