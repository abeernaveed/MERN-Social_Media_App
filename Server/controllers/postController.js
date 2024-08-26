const User = require("../models/authModel");
const Post = require("../models/postModel");

//CREATE
exports.createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body();
    const user = User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newPost = await Post.create({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      userPicturePath: user.picturePath,
      description,
      picturePath,
      likes: [],
      comments: [],
    });
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
//READ
exports.getUserPosts = (req, res) => {
  try {
    const userId = req.params.userId;
    const post = Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
// READ
exports.getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
// UPDATE
exports.likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.body;
    const post = Post.findById(postId);
    const isLiked = post.likes.includes(userId);
    if (isLiked) {
      post.likes = post.likes.filter((id) => id !== userId);
    } else {
      post.likes.push(userId);
    }
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
