const express = require("express");
const { isLoggedIn } = require("../controllers/authController");
const {
  getUserPosts,
  getFeedPosts,
  likePost,
  createPost,
} = require("../controllers/postController");
const upload = require("../utils/multer");
const postRouter = express.Router();

postRouter.route("/", isLoggedIn, upload.single("picture"), createPost);

//READ
postRouter.get("/", isLoggedIn, getFeedPosts);
postRouter.get("/:userId/posts", isLoggedIn, getUserPosts);

//UPDATE
postRouter.patch("/:id/like", isLoggedIn, likePost);

module.exports = postRouter;
