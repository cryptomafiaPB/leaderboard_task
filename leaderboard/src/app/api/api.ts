import axios from 'axios';

const api = axios.create({
    baseURL: process.env.VITE_API_BASE_URL || 'http://localhost:8800/api',
    timeout: 5000,
});

export interface User {
    _id: string;
    name: string;
    avatarUrl?: string;
    totalPoints: number;
    rank?: number;
}

export interface LeaderboardResponse {
    data: {
        data: User[];
        total: number;
    };
    success: boolean;
    message: string;
}

export function fetchUsers(page = 1, limit = 10) {
    return api.get(`/users?page=${page}&limit=${limit}`);
}

export function createUser(name: string, avatarUrl?: string) {
    return api.post('/users', { name, avatarUrl });
}

export function claimPoints(userId: string) {
    return api.post(`/users/${userId}/claim`);
}

export function fetchLeaderboard(page = 1, limit = 10) {
    return api.get<LeaderboardResponse>(`/leaderboard?page=${page}&limit=${limit}`);
}

export function fetchClaimHistory(userId: string, page = 1, limit = 10) {
    return api.get(`/users/${userId}/history?page=${page}&limit=${limit}`);
}

export default api;
