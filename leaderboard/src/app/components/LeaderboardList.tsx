import Image from 'next/image';
import { useLeaderboardContext } from '../context/useLeaderboardContext';
import { Crown, Sparkles, Star, UserRoundPlus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

const LeaderboardList = () => {
    const { leaderboard: users, loading, error } = useLeaderboardContext();

    const leaderboardUsers = users.slice(3); // Skip top 3 users

    if (loading) return <div className="text-center py-4">Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="px-4 pb-6 max-w-3xl mx-auto">
            <Card className="bg-white rounded-t-3xl p-6 shadow-lg">
                <div className="space-y-2">
                    {leaderboardUsers.map((user, index) => (
                        <div key={index} className="flex items-center justify-between border-b border-gray-200 py-2 last:border-0">
                            <div className="flex items-center gap-4">
                                <Link href={`/${user._id}`} className="flex items-center gap-4">
                                    <span className="text-lg font-bold text-gray-600 md:w-6">{user.rank}</span>
                                    <Avatar className="w-12 h-12">
                                        {user.avatarUrl ? (
                                            <AvatarImage src={user.avatarUrl} />
                                        ) : (
                                            <AvatarFallback className={"bg-gray-200 text-white font-bold"}>
                                                {user.avatarUrl?.charAt(0) || 'U'}
                                            </AvatarFallback>
                                        )}
                                    </Avatar>
                                    <div>
                                        <p className="font-medium text-gray-800">{user.name}</p>
                                        <div className="flex items-center gap-1">
                                            {/* <div className="w-3 h-3 bg-yellow-400 rounded-sm"></div> */}
                                            {user.rank! <= 8 && <UserRoundPlus className="w-4 h-4 font-bold text-yellow-400 fill-yellow-400" />}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-gray-800">{user.totalPoints}</span>
                                <Sparkles className="w-5 h-5 text-yellow-400 fill-pink-500" />
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default LeaderboardList;
