import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import api from "../api";
import Navbar from "../components/Navbar";

export default function Analytics() {
  const [data, setData] = useState({});

  useEffect(() => {
    api.get("/analytics").then(res => setData(res.data));
  }, []);

  const chartData = [
    { name: "Users", value: data.totalUsers || 0 },
    { name: "Posts", value: data.totalPosts || 0 },
    { name: "Likes", value: data.totalLikes || 0 },
  ];

  const stats = [
    { label: "Total Users", value: data.totalUsers || 0, color: "bg-indigo-500" },
    { label: "Total Posts", value: data.totalPosts || 0, color: "bg-emerald-500" },
    { label: "Total Likes", value: data.totalLikes || 0, color: "bg-rose-500" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-xl mx-auto px-4 py-6">
        <div className="grid grid-cols-3 gap-4 mb-6">
          {stats.map((s, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm p-4 text-center">
              <div className={`w-10 h-10 ${s.color} rounded-full mx-auto mb-2`} />
              <p className="text-2xl font-bold text-gray-800">{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />
              <Bar dataKey="value" fill="#4f46e5" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}