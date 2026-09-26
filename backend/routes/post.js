const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const auth = require("../middleware/auth");
const sendNotification = require("../redis/notification");

router.post("/", auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  const post = new Post({
    text: req.body.text,
    userId: req.user.id,
    username: user.username
  });
  await post.save();
  res.json(post);
});

router.get("/", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});

router.put("/:id", auth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });
  if (post.userId !== req.user.id) return res.status(403).json({ message: "Not your post" });

  post.text = req.body.text;
  await post.save();
  res.json(post);
});

router.delete("/:id", auth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });
  if (post.userId !== req.user.id) return res.status(403).json({ message: "Not your post" });

  await post.deleteOne();
  res.json({ message: "Post deleted" });
});

router.put("/like/:id", auth, async (req, res) => {
  await Post.findByIdAndUpdate(req.params.id, { $push: { likes: req.user.id } });
  await sendNotification(`Post ${req.params.id} liked by ${req.user.id}`);
  res.send("Liked");
});

router.put("/comment/:id", auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  await Post.findByIdAndUpdate(req.params.id, {
    $push: { comments: { user: req.user.id, username: user.username, text: req.body.text } }
  });
  await sendNotification(`Post ${req.params.id} commented by ${req.user.id}`);
  res.send("Commented");
});

module.exports = router;