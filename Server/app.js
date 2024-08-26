const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// const multer = require("multer");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
const fileURLToPath = require("url");
const morgan = require("morgan");

//Damy Data Insertion
const User = require("./models/authModel");
const Post = require("./models/postModel");

const { users, posts } = require("./data/index");
//
const authRouter = require("./routes/authRoute");
const userRouter = require("./routes/userRoute");
const postRouter = require("./routes/postRoute");

// Configurations

const app = express();
dotenv.config({ path: "./.env" });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());

// Connect Database
const DB = process.env.DATABASE.replace("<password>", process.env.PASSWORD);
mongoose.connect(DB, {}).then(() => console.log("Mongo DB connected!😎!"));

//Route

//Routes with FILES || AUTH
app.use("/auth", authRouter);
//User Routes
app.use("/user", userRouter);
// Post Routes
app.use("/posts", postRouter);

app.listen(process.env.PORT, () => {
  /* ADD DATA ONE TIME*/
  // User.insertMany(users);
  // Post.insertMany(posts);
  console.log(`Server is running on port ${process.env.PORT}`);
});
