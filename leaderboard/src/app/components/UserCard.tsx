import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { User } from "../api/api"
import { Badge } from "@/components/ui/badge"
import { Crown, Trophy } from "lucide-react"

export default function UserCard({ user }: { user: User }) {
    return (
        <Card className="backdrop-blur-sm bg-white/10 border-white/10  rounded-2xl shadow-lg p-6">
            <CardContent className="px-6">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Avatar className="w-20 h-20 border-4 border-white/20">
                            <AvatarImage src={user.avatarUrl} alt={user.name} />
                            <AvatarFallback className="text-xl font-semibold bg-gradient-gold text-primary-foreground">
                                {user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                        </Avatar>

                        <Crown className="w-5 h-5 text-amber-400 absolute -top-2 -right-1" />

                    </div>

                    <div className="flex-1">
                        <h1 className="text-2xl font-bold text-gray-700 mb-2">{user.name}</h1>
                        <div className="flex items-center gap-5">
                            <Badge
                                variant={user.rank === 1 ? "default" : "secondary"}
                                className={`${user.rank === 1
                                    ? "bg-gradient-gold text-primary-foreground"
                                    : "bg-white/30 text-orange-500 border-white/30"
                                    }`}
                            >
                                <Trophy className="w-3 h-3 mr-1" />
                                Rank #{user.rank}
                            </Badge>
                            <span className="text-orange-500 font-semibold text-sm">{user.totalPoints} Points</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card >
    );
}
