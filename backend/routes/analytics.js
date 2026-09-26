const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  const users = await User.countDocuments();
  const posts = await Post.find();

  let totalLikes = 0;
  posts.forEach(p => totalLikes += p.likes.length);

  res.json({ totalUsers: users, totalPosts: posts.length, totalLikes });
});

module.exports = router;