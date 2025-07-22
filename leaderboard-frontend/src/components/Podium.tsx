import React from 'react';
import { type User } from '../api/api';

interface PodiumProps {
    top3: User[]; // should be length ≥3
}

const medalColors = ['bg-yellow-400', 'bg-gray-300', 'bg-yellow-700']; // gold, silver, bronze
const medalText = ['Gold', 'Silver', 'Bronze'];

const Podium: React.FC<PodiumProps> = ({ top3 }) => {
    return (
        <div className="flex justify-center items-end space-x-4 mb-6">
            {top3.map((user, idx) => {
                // Adjust height: silver (2nd) slightly lower than gold, bronze (3rd) lowest
                const heights = ['h-48', 'h-40', 'h-32'];
                return (
                    <div key={user._id} className="flex flex-col items-center">
                        <div
                            className={`w-20 ${heights[idx]} rounded-t-lg ${medalColors[idx]} flex flex-col items-center justify-between shadow-lg`}
                        >
                            <span className="text-white font-bold mt-2">{medalText[idx]}</span>
                            <span className="text-2xl font-extrabold">{user.totalPoints}</span>
                            <img
                                src={user.avatarUrl || '/default-avatar.png'}
                                alt={user.name}
                                className="w-12 h-12 rounded-full -mb-6 border-4 border-white"
                            />
                        </div>
                        <span className="mt-2 text-center font-semibold">{user.name}</span>
                    </div>
                );
            })}
        </div>
    );
};

export default Podium;
