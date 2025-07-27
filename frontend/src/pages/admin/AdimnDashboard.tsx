
import React, { useEffect, useState } from 'react';
import * as api from '../services/adminAPI'; // Your authAPI file
import { toast } from 'react-toastify';

interface User {
  email: string;
  role: string;
  status: 'active' | 'blocked';
  isBlocked: boolean;
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.getUsers();
      const nonAdminUsers = res.data.users.filter(
      (user: User) => user.role !== 'admin'
    );

    setUsers(nonAdminUsers);

    } catch (err) {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleBlockToggle = async (email: string, isBlocked: boolean) => {
    try {
      if (isBlocked) {
        await api.unblockUser(email);
        toast.success('User unblocked');
      } else {
        await api.blockUser(email);
        toast.success('User blocked');
      }
      fetchUsers(); 
    } catch (err) {
      toast.error('Failed to update user status');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      
      <aside className="w-64 bg-pink-100 shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Nestify</h2>
        <ul className="space-y-4 text-gray-700 font-medium">
          <li className="flex items-center gap-2 font-bold">👥 Users</li>
          <li>📦 Listings</li>
          <li>📅 Bookings</li>
          <li>🧑‍🤝‍🧑 Hosters</li>
          <li>💰 Earnings</li>
          <li>📨 Host Requests</li>
          <li>🚪 Logout</li>
        </ul>
      </aside>

      
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Users</h2>
            <button className="px-4 py-2 border rounded">🔍 Filter</button>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className="w-full text-left table-auto">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Email</th>
                  <th className="py-2 px-4">Status</th>
                  <th className="py-2 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.email} className="border-b">
                    <td className="py-2 px-4">{user.email.split('@')[0]}</td>
                    <td className="py-2 px-4">{user.email}</td>
                    <td className="py-2 px-4">
                      {user.isBlocked ? (
                        <span className="text-red-500 font-medium">Blocked</span>
                      ) : (
                        <span className="text-green-500 font-medium">Active</span>
                      )}
                    </td>
                    <td className="py-2 px-4">
                      <button
                        className={`px-4 py-1 rounded text-white ${
                          user.isBlocked ? 'bg-green-500' : 'bg-red-500'
                        }`}
                        onClick={() => handleBlockToggle(user.email, user.isBlocked)}
                      >
                        {user.isBlocked ? 'Unblock' : 'Block'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
