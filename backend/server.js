const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
require("dotenv").config();

const Message = require("./models/Message");

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

io.on("connection", socket => {
  console.log("User connected");

  socket.on("sendMessage", async (data) => {
    try {
      const message = new Message(data);
      await message.save();
      io.emit("receiveMessage", message);
    } catch (err) {
      console.error("Message save failed:", err.message);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/posts", require("./routes/post"));
app.use("/api/users", require("./routes/user"));
app.use("/api/analytics", require("./routes/analytics"));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on ${PORT}`));