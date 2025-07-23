"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { createUser } from '../api/api';
import { useLeaderboardContext } from '../context/useLeaderboardContext';
import { Button } from '@/components/ui/button';

interface AddUserModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose }) => {
    const [name, setName] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { fetchPage } = useLeaderboardContext();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) {
            setError('Name is required.');
            return;
        }

        setSubmitting(true);
        setError(null);
        try {
            await createUser(name.trim(), avatarUrl.trim() || undefined);
            // Refresh the first page to include the new user
            await fetchPage(1);
            onClose();
            // Reset form
            setName('');
            setAvatarUrl('');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to create user.');
        } finally {
            setSubmitting(false);
        }
    };

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white shadow-lg text-black rounded-lg w-11/12 sm:w-96 p-6">
                <h2 className="text-xl font-semibold mb-4">Add New User</h2>
                {error && <div className="text-red-600 mb-2">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border rounded focus:outline-none focus:ring"
                            placeholder="e.g. John Doe"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Avatar URL (optional)</label>
                        <input
                            type="url"
                            value={avatarUrl}
                            onChange={(e) => setAvatarUrl(e.target.value)}
                            className="w-full p-2 border rounded focus:outline-none focus:ring"
                            placeholder="https://example.com/avatar.jpg"
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <Button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-black cursor-pointer"
                            disabled={submitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className={`px-4 py-2 cursor-pointer rounded text-white ${submitting ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                            disabled={submitting}
                        >
                            {submitting ? 'Adding…' : 'Add User'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddUserModal;
