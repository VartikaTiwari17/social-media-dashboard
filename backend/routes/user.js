const router = require("express").Router();
const User = require("../models/User");
const auth = require("../middleware/auth");

router.put("/follow/:id", auth, async (req, res) => {
  if (req.params.id === req.user.id) return res.status(400).json({ message: "Can't follow yourself" });

  await User.findByIdAndUpdate(req.params.id, { $addToSet: { followers: req.user.id } });
  await User.findByIdAndUpdate(req.user.id, { $addToSet: { following: req.params.id } });
  res.json({ message: "Followed" });
});

router.put("/unfollow/:id", auth, async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { $pull: { followers: req.user.id } });
  await User.findByIdAndUpdate(req.user.id, { $pull: { following: req.params.id } });
  res.json({ message: "Unfollowed" });
});

router.get("/all", auth, async (req, res) => {
  const users = await User.find({ _id: { $ne: req.user.id } }).select("-password");
  res.json(users);
});

module.exports = router;
