import { useState, useEffect } from "react";
import api from "../api";
import Navbar from "../components/Navbar";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const loadPosts = () => {
    api.get("/posts").then(res => setPosts(res.data));
  };

  useEffect(() => { loadPosts(); }, []);

  const handlePost = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await api.post("/posts", { text });
    setText("");
    loadPosts();
  };

  const handleLike = async (id) => {
    await api.put(`/posts/like/${id}`);
    loadPosts();
  };

  const handleComment = async (id, commentText) => {
    if (!commentText.trim()) return;
    await api.put(`/posts/comment/${id}`, { text: commentText });
    loadPosts();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this post?")) return;
    await api.delete(`/posts/${id}`);
    loadPosts();
  };

  const handleEdit = async (id, newText) => {
    await api.put(`/posts/${id}`, { text: newText });
    loadPosts();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-xl mx-auto px-4 py-6">
        <form onSubmit={handlePost} className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-semibold shrink-0">
              {user.username?.[0]?.toUpperCase() || "U"}
            </div>
            <input
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="What's on your mind?"
              className="flex-1 border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div className="flex justify-end mt-3">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-5 py-1.5 rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              Post
            </button>
          </div>
        </form>

        <div className="space-y-4">
          {posts.map(post => (
            <PostCard
              key={post._id}
              post={post}
              currentUserId={user._id}
              onLike={handleLike}
              onComment={handleComment}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function PostCard({ post, currentUserId, onLike, onComment, onDelete, onEdit }) {
  const [comment, setComment] = useState("");
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(post.text);
  const isOwner = post.userId === currentUserId;

  const timeAgo = (date) => {
    const diff = Math.floor((Date.now() - new Date(date)) / 1000);
    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center text-sm font-semibold">
            {post.username?.[0]?.toUpperCase() || "U"}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">{post.username || "Unknown"}</p>
            <p className="text-xs text-gray-400">{post.createdAt ? timeAgo(post.createdAt) : ""}</p>
          </div>
        </div>

        {isOwner && (
          <div className="flex gap-2 text-xs text-gray-400">
            <button onClick={() => setEditing(!editing)} className="hover:text-indigo-600">Edit</button>
            <button onClick={() => onDelete(post._id)} className="hover:text-red-600">Delete</button>
          </div>
        )}
      </div>

      {editing ? (
        <div className="flex gap-2 mb-3">
          <input
            value={editText}
            onChange={e => setEditText(e.target.value)}
            className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm"
          />
          <button
            onClick={() => { onEdit(post._id, editText); setEditing(false); }}
            className="text-indigo-600 text-sm font-medium"
          >
            Save
          </button>
        </div>
      ) : (
        <p className="text-gray-800 mb-3">{post.text}</p>
      )}

      <div className="flex items-center gap-4 border-t border-gray-100 pt-3 text-sm text-gray-500">
        <button
          onClick={() => onLike(post._id)}
          className="flex items-center gap-1 hover:text-indigo-600 transition"
        >
          👍 <span>{post.likes?.length || 0}</span>
        </button>
        <span>💬 {post.comments?.length || 0} comments</span>
      </div>

      <div className="mt-3 space-y-1">
        {post.comments?.map((c, i) => (
          <p key={i} className="text-sm bg-gray-50 rounded-lg px-3 py-1.5">
            <span className="font-semibold">{c.username || "User"}:</span> {c.text}
          </p>
        ))}
      </div>

      <div className="flex gap-2 mt-3">
        <input
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 border border-gray-200 rounded-full px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          onClick={() => { onComment(post._id, comment); setComment(""); }}
          className="text-indigo-600 text-sm font-medium px-3"
        >
          Send
        </button>
      </div>
    </div>
  );
}