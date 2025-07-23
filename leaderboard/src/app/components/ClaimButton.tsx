import React, { useState } from 'react';
import { claimPoints } from '../api/api';
import { useLeaderboardContext } from '../context/useLeaderboardContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

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
            const { points } = res.data.data;
            setLastPoints(points);
            // Refresh leaderboard page 1
            fetchPage(1);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error('Claim error', err);
        } finally {
            setLoading(false);
            toast.success('Points claimed!');
        }
    };

    return (
        <div className="w-full sm:w-auto flex flex-col items-center space-y-2">
            <Button
                onClick={handleClaim}
                disabled={!userId || loading}
                className={`px-6 py-3 rounded-lg text-white font-semibold focus:outline-none ${userId
                    ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                    : 'bg-gray-400 cursor-not-allowed'
                    }`}
            >
                {loading ? 'Claiming…' : 'Claim Points'}
            </Button>
        </div>
    );
};

export default ClaimButton;
