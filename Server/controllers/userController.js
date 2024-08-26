const User = require("../models/authModel");

exports.getUser = async (req, res) => {
  try {
    const id = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getUserFriends = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).populate("friends");
    res.status(200).json(user.friends);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//UPDATE
exports.addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);
    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== user.id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    res.status(200).json(user.friends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
