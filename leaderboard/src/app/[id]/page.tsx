/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchClaimHistory, User } from "../api/api";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, CircleCheckBig, Gift, HelpCircle, Sparkles, Trophy, UserRoundPlus } from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import UserCard from "../components/UserCard";

export interface ClaimedReward {
    _id: string;
    userId: User;
    points: number;
    claimedAt: string; // ISO 8601 date string
}

export default function UserPage() {
    const { id: userId } = useParams();
    const [userHistory, setUserHistory] = useState<ClaimedReward[]>(); // Adjust type as needed

    useEffect(() => {
        // You can fetch user data here using the userId
        const fetchUserHistory = async () => {
            if (!userId) return;
            const history = await fetchClaimHistory(String(userId), 1, 10);
            setUserHistory(history.data.data.history);
        };
        fetchUserHistory();
    }, [userId]);

    const dateFormat: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-golden-light to-golden-secondary">
            {/* Header Navigation */}
            <div className="flex items-center justify-between p-4 pt-6 ">
                <Link href={`/`} className="flex items-center hover:text-gray-800 transition-colors">
                    <ArrowLeft className="w-6 h-6 text-gray-500 hover:text-black transition-colors" />
                </Link>
                <div className="flex space-x-2 sm:space-x-6 sm:bg-white sm:shadow-md sm:rounded-full sm:mb-4 sm:px-4 sm:py-2">
                    <span className="text-center text-sm text-gray-600 hover:border-b-2 border-yellow-400 pb-1 transition-all cursor-pointer">Party Ranking</span>
                    <Link href={`/`} className="text-center text-sm font-medium text-gray-800 border-b-2 border-yellow-400 pb-1 cursor-pointer">Live Ranking</Link>
                    <span className="text-center text-sm text-gray-600 hover:border-b-2 border-yellow-400 pb-1 transition-all cursor-pointer">Hourly Ranking</span>
                    <span className="text-center text-sm text-gray-600 hover:border-b-2 border-yellow-400 pb-1 transition-all cursor-pointer">Family Ranking</span>
                </div>
                <HelpCircle className="w-6 h-6 text-gray-700" />
            </div>

            <div className="px-4 py-4 flex gap-3 sm:gap-6 items-center justify-center">
                <Button variant={"secondary"} className="cursor-pointer flex-1 bg-white/90 hover:bg-white rounded-full py-3 text-gray-800 font-medium max-w-96 ">
                    <Trophy className="w-4 h-4 mr-2 text-yellow-600" />
                    Contribution
                    <div className="flex ml-2">
                        <div className="w-5 h-5 rounded-full bg-gray-300 -mr-1 border-2 border-white"></div>
                        <div className="w-5 h-5 rounded-full bg-black -mr-1 border-2 border-white"></div>
                        <div className="w-5 h-5 rounded-full bg-green-500 border-2 border-white"></div>
                    </div>
                </Button>

                <Button variant={"secondary"} className="cursor-pointer bg-white/90 hover:bg-white rounded-full px-6 py-3 text-gray-800 font-medium hidden sm:flex items-center">
                    <Sparkles className="w-4 h-4 mr-2 text-yellow-400  fill-pink-500" />
                    Star tasks
                </Button>

                <Button variant={"secondary"} className="cursor-pointer bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 rounded-full px-6 py-3 text-white font-medium">
                    <Gift className="w-4 h-4 mr-2" />
                    Rewards
                </Button>
            </div>

            <div className="px-4 py-6">
                {(userHistory && userHistory?.length > 0) ? (<UserCard user={userHistory[0].userId} />) : (null)}
            </div>

            {/* User History */}
            <div className="px-4 pb-6 max-w-3xl mx-auto">
                <Card className="bg-white rounded-t-3xl p-8 pl-14 shadow-lg gap-3">
                    <CardTitle className="flex items-center gap-2 text-xl font-semibold text-gray-800">
                        <Calendar className="w-5 h-5" />
                        Claim Points History
                    </CardTitle>
                    <div className="relative mt-6 ml-6 border-gray-200 dark:border-gray-700">
                        {userHistory?.map((user, index) => (
                            <div
                                key={index}
                                className="group relative flex items-start gap-4 mb-1 last:mb-0 hover:bg-gray-100 transition-colors rounded-xl p-4 -ml-4 border-b border-gray-200 last:border-b-0"
                            >
                                {/* Success check icon */}
                                <CircleCheckBig className="absolute -left-6 top-6 w-4 h-4 text-green-500" />
                                
                                <Avatar className="w-12 h-12 shadow-md">
                                    {user.userId.avatarUrl ? (
                                        <AvatarImage src={user.userId.avatarUrl} />
                                    ) : (
                                        <AvatarFallback className={"bg-gray-200 text-white font-bold"}>
                                            {user.points || 'U'}
                                        </AvatarFallback>
                                    )}
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-semibold text-gray-800 text-lg">+{user.points}</span>
                                        <span className="text-green-500 text-sm font-medium flex items-center gap-1">
                                            <Sparkles className="w-4 h-4 text-yellow-400 fill-pink-500" /> points
                                        </span>
                                    </div>
                                    <div className="text-gray-500 text-sm flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-gray-400" />
                                        {new Date(user.claimedAt).toLocaleDateString(undefined, dateFormat)}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {(!userHistory || userHistory.length === 0) && (
                            <div className="text-gray-400 text-center py-8">No claim history found.</div>
                        )}
                    </div>
                </Card>
            </div>


        </div>
    );
}