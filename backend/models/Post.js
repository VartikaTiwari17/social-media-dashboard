const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  userId: String,
  text: String,
  likes: [String],
  comments: [{ user: String, text: String }]
});

module.exports = mongoose.model("Post", PostSchema);
