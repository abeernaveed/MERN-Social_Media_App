const express = require("express");
const {
  getUser,
  getUserFriends,
  addRemoveFriend,
} = require("../controllers/userController");
const { isLoggedIn } = require("../controllers/authController");
const userRouter = express.Router();

// userRouter.get("/:id", isLoggedIn, getUser);
// userRouter.get("/:id/friends", isLoggedIn, getUserFriends);
// userRouter.patch("/:id/:friendId", isLoggedIn, addRemoveFriend);

// Just for backend Testing
userRouter.get("/:id", getUser);
userRouter.get("/:id/friends", getUserFriends);
userRouter.patch("/:id/:friendId", addRemoveFriend);

module.exports = userRouter;
