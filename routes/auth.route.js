const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { register, login } = require("../validators/auth.validators");
const validateBody = require("../middleware/validateBody");
const User = require("../models/user.model");
const { generateAccesAndRefreshToken } = require("../services/token.service");

router.post("/register", validateBody(register), async (req, res) => {
  try {
    if (await User.isEmailTaken(req.body.email)) {
      return res.status(400).send({
        errors: {
          email: "Email is already taken",
        },
      });
    }
    const user = await User.create(req.body);

    res.status(200).send({
      message: "User created successfully",
      email: user.email,
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/login", validateBody(login), async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user) {
    return res.status(400).send({
      errors: {
        email: "Email not found",
      },
    });
  }
  const isMatch = await user.comparePassword(req.body.password);
  if (!isMatch) {
    return res.status(400).send({
      errors: {
        password: "Password is incorrect",
      },
    });
  }
  const { accessToken, refreshToken } = await generateAccesAndRefreshToken(
    user
  );
  user.refreshToken = refreshToken;
  await user.save();

  res.status(200).send({
    message: "User logged in successfully",
    email: user.email,
    accessToken,
  });
});

router.post("/refresh-token", async (req, res) => {
  const refreshToken = req.body.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    return res.status(400).send({
      errors: {
        token: "Invalid token",
      },
    });
  }
  const { accessToken, refreshToken: token } =
    await generateAccesAndRefreshToken(user);
  user.refreshToken = token;
  await user.save();

  res.status(200).send({
    accessToken,
    refreshToken: token,
  });
});

module.exports = router;
