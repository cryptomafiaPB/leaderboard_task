/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchClaimHistory } from "../api/api";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Gift, HelpCircle, Sparkles, Trophy, UserRoundPlus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserPage() {
    const { id: userId } = useParams();
    const [userHistory, setUserHistory] = useState<any[]>([]); // Adjust type as needed

    useEffect(() => {
        // You can fetch user data here using the userId
        const fetchUserHistory = async () => {
            if (!userId) return;
            const history = await fetchClaimHistory(String(userId), 1, 10);
            setUserHistory(history.data.data.history);
        };
        fetchUserHistory();
    }, [userId]);

    console.log("User History:", userHistory);

    return (
        <div className="min-h-screen bg-gradient-to-b from-golden-light to-golden-secondary">
            {/* Header Navigation */}
            <div className="flex items-center justify-between p-4 pt-6 ">
                <ArrowLeft className="w-6 h-6 text-gray-700" />
                <div className="flex space-x-2 sm:space-x-6 sm:bg-white sm:shadow-md sm:rounded-full sm:mb-4 sm:px-4 sm:py-2">
                    <span className="text-center text-sm text-gray-600 hover:border-b-2 border-yellow-400 pb-1 transition-all cursor-pointer">Party Ranking</span>
                    <span className="text-center text-sm font-medium text-gray-800 border-b-2 border-yellow-400 pb-1 cursor-pointer">Live Ranking</span>
                    <span className="text-center text-sm text-gray-600 hover:border-b-2 border-yellow-400 pb-1 transition-all cursor-pointer">Hourly Ranking</span>
                    <span className="text-center text-sm text-gray-600 hover:border-b-2 border-yellow-400 pb-1 transition-all cursor-pointer">Family Ranking</span>
                </div>
                <HelpCircle className="w-6 h-6 text-gray-700" />
            </div>

            {/* Settlement Timer */}
            <div className="px-4 py-2">
                <div className="text-center text-sm text-gray-700 font-medium">
                    Settlement Time 2 days 04:30:00
                </div>
            </div>

            {/* Feature Buttons */}
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

            <div className="px-4 pb-6 max-w-3xl mx-auto">
                <Card className="bg-white rounded-t-3xl p-6 shadow-lg">
                    <div className="space-y-2">
                        {userHistory.map((user, index) => (
                            <div key={index} className="flex items-center justify-between border-b border-gray-200 py-2 last:border-0">
                                <div className="flex items-center gap-4">
                                    <span className="text-lg font-bold text-gray-600 md:w-6">{user.rank}</span>
                                    <Avatar className="w-12 h-12">
                                        {user.userId.avatarUrl ? (
                                            <AvatarImage src={user.userId.avatarUrl} />
                                        ) : (
                                            <AvatarFallback className={"bg-gray-200 text-white font-bold"}>
                                                {user.points?.charAt(0) || 'U'}
                                            </AvatarFallback>
                                        )}
                                    </Avatar>
                                    <div>
                                        <p className="font-medium text-gray-800">Point claimed: </p>
                                        <p className="font-light text-gray-600">{user.claimedAt}</p>
                                        <div className="flex items-center gap-1">
                                            {/* <div className="w-3 h-3 bg-yellow-400 rounded-sm"></div> */}
                                            {user.rank! <= 8 && <UserRoundPlus className="w-4 h-4 font-bold text-yellow-400 fill-yellow-400" />}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-gray-800">{user.points}</span>
                                    <Sparkles className="w-5 h-5 text-yellow-400 fill-pink-500" />
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>


        </div>
    );
}