import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [data, setData] = useState({});

  useEffect(() => {
    axios.get("http://localhost:5000/api/analytics")
      .then(res => setData(res.data));
  }, []);

  return (
    <div>
      <h2>Analytics Dashboard</h2>
      <p>Total Users: {data.totalUsers}</p>
      <p>Total Posts: {data.totalPosts}</p>
      <p>Total Likes: {data.totalLikes}</p>
    </div>
  );
}
