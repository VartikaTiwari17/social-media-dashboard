const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

router.get("/", async (req, res) => {
  const users = await User.countDocuments();
  const posts = await Post.find();

  let totalLikes = 0;
  posts.forEach(p => totalLikes += p.likes.length);

  res.json({
    totalUsers: users,
    totalPosts: posts.length,
    totalLikes
  });
});

module.exports = router;
