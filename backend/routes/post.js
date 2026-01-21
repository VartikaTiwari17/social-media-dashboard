const router = require("express").Router();
const Post = require("../models/Post");

// Create Post
router.post("/", async (req, res) => {
  const post = new Post(req.body);
  await post.save();
  res.json(post);
});

// Like Post
router.put("/like/:id", async (req, res) => {
  await Post.findByIdAndUpdate(req.params.id, {
    $push: { likes: req.body.userId }
  });
  res.send("Liked");
});

// Comment on Post
router.put("/comment/:id", async (req, res) => {
  await Post.findByIdAndUpdate(req.params.id, {
    $push: { comments: req.body }
  });
  res.send("Commented");
});

// Get All Posts
router.get("/", async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

module.exports = router;
