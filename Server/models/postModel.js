const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    description: {
      type: String,
    },
    picturePath: {
      type: String,
    },
    userPicturePath: {
      type: String,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("post", postSchema);
