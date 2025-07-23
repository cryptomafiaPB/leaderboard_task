"use client";
import { useLeaderboardContext } from "./context/useLeaderboardContext";
import { useState } from "react";
import Podium from "./components/Podium";
import UserSelector from "./components/UserSelector";
import ClaimButton from "./components/ClaimButton";
import LeaderboardList from "./components/LeaderboardList";
import AddUserModal from "./components/AddUserModal";
import { ArrowLeft, Gift, HelpCircle, Sparkles, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { allUsers } = useLeaderboardContext();
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  if (!allUsers) return <div>Loading users…</div>;

  // Extract top-3 and the rest
  const top3 = allUsers && allUsers.length > 0 ? allUsers.slice(0, 3) : [];
  const rest = allUsers && allUsers.length > 0 ? allUsers.slice(3) : [];

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


      <Podium top3={top3} />

      <div className="flex flex-col items-center justify-center sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0 mb-6">
        <UserSelector selectedId={selectedUser} onSelect={setSelectedUser} />
        <ClaimButton userId={selectedUser} />
        <Button variant={"secondary"}
          onClick={() => setModalOpen(true)}
          className="text-sm text-blue-600 hover:underline cursor-pointer"
        >
          Add New User
        </Button>
      </div>



      <LeaderboardList />

      <AddUserModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

    </div>

  );
}
