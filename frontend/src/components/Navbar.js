import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const linkClass = (path) =>
    `px-4 py-2 rounded-lg font-medium transition ${
      location.pathname === path
        ? "bg-indigo-600 text-white"
        : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-indigo-600">SocialDash</h1>

        <div className="flex gap-2 items-center">
          <Link to="/" className={linkClass("/")}>Feed</Link>
          <Link to="/chat" className={linkClass("/chat")}>Chat</Link>
          <Link to="/analytics" className={linkClass("/analytics")}>Analytics</Link>
          <Link to="/users" className={linkClass("/users")}>People</Link>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">Hi, {user.username}</span>
          <button
            onClick={handleLogout}
            className="text-sm px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}