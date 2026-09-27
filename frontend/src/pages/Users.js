import { useState, useEffect } from "react";
import api from "../api";
import Navbar from "../components/Navbar";

export default function Users() {
  const [users, setUsers] = useState([]);
  const currentUserId = JSON.parse(localStorage.getItem("user") || "{}")._id;

  const loadUsers = () => {
    api.get("/users/all").then(res => setUsers(res.data));
  };

  useEffect(() => { loadUsers(); }, []);

  const isFollowing = (u) => u.followers?.includes(currentUserId);

  const handleFollow = async (id) => {
    await api.put(`/users/follow/${id}`);
    loadUsers();
  };

  const handleUnfollow = async (id) => {
    await api.put(`/users/unfollow/${id}`);
    loadUsers();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-xl mx-auto px-4 py-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">People</h2>
        <div className="space-y-3">
          {users.map(u => (
            <div key={u._id} className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-semibold">
                  {u.username?.[0]?.toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{u.username}</p>
                  <p className="text-xs text-gray-400">{u.followers?.length || 0} followers</p>
                </div>
              </div>

              {isFollowing(u) ? (
                <button
                  onClick={() => handleUnfollow(u._id)}
                  className="text-sm px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Unfollow
                </button>
              ) : (
                <button
                  onClick={() => handleFollow(u._id)}
                  className="text-sm px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  Follow
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}