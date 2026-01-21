const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/social_dashboard");

io.on("connection", socket => {
  console.log("User connected");
  socket.on("sendMessage", data => {
    io.emit("receiveMessage", data);
  });
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/posts", require("./routes/post"));
app.use("/api/analytics", require("./routes/analytics"));


server.listen(5000, () => console.log("Server running on 5000"));
