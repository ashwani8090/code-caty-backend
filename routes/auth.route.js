const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { register, login } = require("../validators/auth.validators");
const validateBody = require("../middleware/validateBody");
const User = require("../models/user.model");
const { generateAccesAndRefreshToken } = require("../services/token.service");
const {
  registerUser,
  loginUser,
  refreshToken,
} = require("../controller/auth.controller");

router.post("/register", validateBody(register), registerUser);
router.post("/login", validateBody(login), loginUser);
router.post("/refresh-token", refreshToken);

module.exports = router;
