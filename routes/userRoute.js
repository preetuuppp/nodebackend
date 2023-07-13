const express = require("express");
const bcrypt = require("bcrypt");
const { userModel } = require("../model/userModel");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

// registering the user
userRouter.post("/signup", async (req, res) => {
  const { email, password, confirmpassword } = req.body;
  try {
    bcrypt.hash(confirmpassword, 5, async (err, hash) => {
      if (err) {
        res.json({ error: err.message });
      } else {
        const user = new userModel({ email, password, confirmpassword: hash });
        await user.save();
        res.json({ msg: "Successfully registered", user: req.body });
      }
    });
  } catch (error) {
    res.json(error);
  }
});

// login the user
userRouter.post("/login", async (req, res) => {
  const { email, confirmpassword } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      bcrypt.compare(confirmpassword, user.confirmpassword, (err, result) => {
        if (result) {
          let token = jwt.sign(
            { userID: user._id, user: user.email },
            process.env.secret
          );
          res.json({ msg: "Successfully logged in", token });
        } else {
          res.json({ error: "Failed to log in" });
        }
      });
    } else {
      res.json({ error: "user not found" });
    }
  } catch (error) {
    res.json(error);
  }
});

// logout the user
userRouter.post("/logout", (req, res) => {});

module.exports = {
  userRouter,
};
