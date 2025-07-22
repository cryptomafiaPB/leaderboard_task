import React, { useState } from 'react';
import { claimPoints } from '../api/api';
import { useLeaderboardContext } from '../context/LeaderboardContext';

interface ClaimButtonProps {
    userId: string | null;
}

const ClaimButton: React.FC<ClaimButtonProps> = ({ userId }) => {
    const [loading, setLoading] = useState(false);
    const [lastPoints, setLastPoints] = useState<number | null>(null);
    const { fetchPage } = useLeaderboardContext();

    const handleClaim = async () => {
        if (!userId) return;
        setLoading(true);
        try {
            const res = await claimPoints(userId);
            const { points } = res.data;
            setLastPoints(points);
            // Refresh leaderboard page 1
            fetchPage(1);
            // @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error('Claim error', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center space-y-2">
            <button
                onClick={handleClaim}
                disabled={!userId || loading}
                className={`px-6 py-3 rounded-lg text-white font-semibold focus:outline-none ${userId
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-400 cursor-not-allowed'
                    }`}
            >
                {loading ? 'Claiming…' : 'Claim Points'}
            </button>
            {lastPoints !== null && (
                <span className="text-green-600">You got +{lastPoints} points!</span>
            )}
        </div>
    );
};

export default ClaimButton;
