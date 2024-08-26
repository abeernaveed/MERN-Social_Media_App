const express = require("express");
const authController = require("../controllers/authController");
const authRouter = express.Router();

const upload = require("../utils/multer");

authRouter
  .route("/register")
  .post(upload.single("file"), authController.register);

authRouter.route("/login").post(authController.login);

module.exports = authRouter;
