const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  email: { type: String, required: true, unique: true },
  password: String,
  followers: [String],
  following: [String]
});

module.exports = mongoose.model("User", UserSchema);