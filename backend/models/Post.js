const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  text: String,
  userId: String,
  username: String,
  likes: [String],
  comments: [
    {
      user: String,
      username: String,
      text: String
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Post", PostSchema);