import React from 'react';
import { type User } from '../api/api';
import { useLeaderboardContext } from '../context/useLeaderboardContext';
import { Crown, Sparkles, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Avatar } from '@radix-ui/react-avatar';
import { AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface PodiumProps {
    top3: User[]; // should be length ≥3
}

const Podium: React.FC<PodiumProps> = () => {

    const { leaderboard } = useLeaderboardContext();
    const top3 = leaderboard.slice(0, 3);

    if (!Array.isArray(top3) || top3.length < 3) return null;

    return (
        <div className="px-4 py-6">
            <div className="flex justify-center items-end gap-4">
                {/* 2nd Place */}
                <div className="flex flex-col items-center">
                    <Card className="relative bg-white p-6 rounded-2xl shadow-lg w-24 h-24 flex items-center justify-center mb-2">
                        <Link href={`/${top3[1]._id}`} className="flex items-center justify-center">
                            <Avatar className="w-16 h-16 hover:scale-105 transition-transform cursor-pointer">
                                <AvatarImage className='rounded-full ' src={top3[1].avatarUrl || '/default-avatar.png'} alt={top3[1].name} />
                                <AvatarFallback className="bg-gray-200 text-gray-600">S</AvatarFallback>
                            </Avatar>
                            <Badge className="absolute -top-2 -left-2 bg-rank-silver text-white font-bold w-8 h-8 rounded-full flex items-center justify-center text-sm">
                                2
                            </Badge>
                        </Link>
                    </Card>
                    <div className="text-center">
                        <p className="text-sm font-medium text-gray-800">{top3[1].name}</p>
                        <div className="flex items-center justify-center mt-1">
                            <Sparkles className="w-4 h-4 text-yellow-400 fill-pink-500 mr-1" />
                            <span className="text-sm font-bold text-gray-800">{top3[1].totalPoints}</span>
                        </div>
                    </div>
                </div>

                {/* 1st Place */}
                <div className="flex flex-col items-center -mt-4">
                    <Card className="relative bg-white p-6 rounded-2xl shadow-lg w-28 h-28 flex items-center justify-center mb-2">
                        <Link href={`/${top3[0]._id}`} className="flex items-center justify-center">
                            <Avatar className="w-18 h-18  hover:scale-110 transition-transform cursor-pointer">
                                <AvatarImage className='rounded-full' src={top3[0].avatarUrl || '/default-avatar.png'} alt={top3[0].name} />
                                <AvatarFallback className="bg-gray-200 text-gray-600">S</AvatarFallback>
                            </Avatar>
                            <Badge className="absolute -top-3 -left-3 bg-yellow-400 text-white font-bold w-10 h-10 rounded-full flex items-center justify-center hover:bg-yellow-500 text-lg cursor-pointer hover:w-11 hover:h-11 transition-all">
                                <Crown className="w-20 h-20" />
                            </Badge>
                        </Link>
                    </Card>
                    <div className="text-center">
                        <p className="text-sm font-medium text-gray-800">{top3[0].name}</p>
                        <div className="flex items-center justify-center mt-1">
                            <Sparkles className="w-4 h-4 text-yellow-400 fill-pink-500 mr-1" />
                            <span className="text-sm font-bold text-gray-800">{top3[0].totalPoints}</span>
                        </div>
                    </div>
                </div>

                {/* 3rd Place */}
                <div className="flex flex-col items-center">
                    <Card className="relative bg-white p-6 rounded-2xl shadow-lg w-24 h-24 flex items-center justify-center mb-2">
                        <Link href={`/${top3[2]._id}`} className="flex items-center justify-center">
                            <Avatar className="w-16 h-16 hover:scale-105 transition-transform cursor-pointer">
                                <AvatarImage className='rounded-full' src={top3[2].avatarUrl || '/default-avatar.png'} alt={top3[2].name} />
                                <AvatarFallback className="bg-gray-200 text-gray-600">S</AvatarFallback>
                            </Avatar>
                            <Badge className="absolute -top-2 -left-2 bg-rank-bronze text-white font-bold w-8 h-8 rounded-full flex items-center justify-center text-sm">
                                3
                            </Badge>
                        </Link>
                    </Card>
                    <div className="text-center">
                        <p className="text-sm font-medium text-gray-800">{top3[2].name}</p>
                        <div className="flex items-center justify-center mt-1">
                            <Sparkles className="w-4 h-4 text-yellow-400 fill-pink-500 mr-1" />
                            <span className="text-sm font-bold text-gray-800">{top3[2].totalPoints}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div >

    );
};

export default Podium;
