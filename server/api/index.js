const express = require("express");
const postRouter = require("./post.router");
const database = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
passport = require("./passport");

const SECRET = process.env.SECRET || "funkyFries";

const router = express.Router();

const issueToken = (userId) => {
  return jwt.sign({ sub: userId }, SECRET);
};

router.use("/posts", postRouter);

router.get(
  "/test-auth",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    res.send("you sir, have access");
  }
);

router.post("/users/register", async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    const encryptedPass = await bcrypt.hash(password, 5);

    const user = await database.createUser(userName, encryptedPass);
    const signedToken = issueToken(user._id);
    res.send({ _id: user._id, username: user.username, token: signedToken });
  } catch (error) {
    next(error);
  }
});

router.post("/users/login", async (req, res, next) => {
  try {
    const { userName, password } = req.body;

    const user = await database.findUserByUsername(userName);

    if (!user) throw new Error("User not found");

    const isMatchingPassword = await bcrypt.compare(password, user.password);

    if (!isMatchingPassword) throw new Error("Incorrect Password");

    const signedToken = issueToken(user._id);
    res.send({ _id: user._id, username: user.username, token: signedToken });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
