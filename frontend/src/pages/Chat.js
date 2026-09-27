import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import Navbar from "../components/Navbar";

const socket = io(process.env.REACT_APP_API_URL);

export default function Chat() {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const bottomRef = useRef(null);

  useEffect(() => {
    socket.on("receiveMessage", data => {
      setChat(prev => [...prev, data]);
    });
    return () => socket.off("receiveMessage");
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const sendMessage = () => {
    if (!msg.trim()) return;
    socket.emit("sendMessage", { sender: user.username || "Me", text: msg });
    setMsg("");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm h-96 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {chat.map((m, i) => {
              const isMe = m.sender === user.username;
              return (
                <div key={i} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm ${
                      isMe ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {!isMe && <p className="text-xs font-semibold mb-0.5 opacity-70">{m.sender}</p>}
                    {m.text}
                  </div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>

          <div className="border-t border-gray-100 p-3 flex gap-2">
            <input
              value={msg}
              onChange={e => setMsg(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              onClick={sendMessage}
              className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-indigo-700 transition"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}