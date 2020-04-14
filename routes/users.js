const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");

const User = require("../model/User");
const auth = require("../middleware/auth");

const Helper = require("../objects/Helper/User");

const minutes = 14;

// Register a user
router.post(
  "/",
  [
    check("name", "Please add Name").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("type", "Please indicate type").not().isEmpty(),
    check("password", "Please enter 8 or more password").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const user = new User(req.body);

    try {
      await user.save();
      const token = await user.generateAuthToken();

      // Generate a Refresher token
      const refresherToken = await user.generateRefresherToken();

      // Set a cookie for persisting the user
      res.cookie("jwt_id", refresherToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });

      res.status(201).send({ user, token, minutes });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }
);

// Get user
router.get("/", auth, async (req, res) => {
  res.send(req.user);
});

// Login
router.post(
  "/login",
  [
    check("email", "Please add an email").isEmail(),
    check("password", "Please add a password").not().isEmpty(),
  ],
  async (req, res) => {
    try {
      validationResult(req).throw();
      const user = await User.getCredentials(req.body.email, req.body.password);
      const token = await user.generateAuthToken();
      // Generate a Refresher token
      const refresherToken = await user.generateRefresherToken();

      // Set a cookie for persisting the user
      res.cookie("jwt_id", refresherToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
      });

      res.send({ user, token, minutes });
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: "Unable to login" });
    }
  }
);

// Logout
router.get("/logout", auth, async (req, res) => {
  try {
    req.user.refresher_token = req.user.refresher_token.filter(
      (refresherToken) => {
        return refresherToken.token !== req.cookies.jwt_id;
      }
    );

    await req.user.save();

    res.clearCookie("jwt_id");

    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});

// Refresher Token
router.get("/refresher_token", async (req, res) => {
  const jwtId = req.cookies.jwt_id;
  if (!req.cookies.jwt_id) {
    return res.status(401).send({ error: "Please Authenticate" });
  }
  try {
    const token = await Helper.getToken(jwtId);

    res.send({ token, minutes });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

module.exports = router;
