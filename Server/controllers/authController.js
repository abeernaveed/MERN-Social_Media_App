const User = require("../models/authModel");
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());

exports.register = async (req, res) => {
  try {
    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      picturePath: req.body.picturePath,
      friends: req.body.friends,
      location: req.body.location,
      occupation: req.body.occupation,
      impressions: Math.floor(Math.random() * 10000),
      viewedProfile: Math.floor(Math.random() * 10000),
    });
    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide email and password",
      });
    }
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: "fail",
        message: "Incorrect email or password",
      });
    }
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );
    res.cookie("token", token);
    res.status(200).json({
      status: "success",
      token,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
exports.isLoggedIn = (req, res, next) => {
  try {
    if (req.cookies.token === "") {
      return res.redirect("/login");
    } else {
      let data = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
      req.user = data;
    }
    next();
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
