const express = require("express");
const router = express.Router();
const { register, login } = require("../validators/auth.validators");
const validateBody = require("../middleware/validateBody");
const {
  registerUser,
  loginUser,
  refreshToken,
  verifyEmail,
} = require("../controller/auth.controller");

router.get("/verify-email/:token", verifyEmail);

router.post("/register", validateBody(register), registerUser);
router.post("/login", validateBody(login), loginUser);
router.post("/refresh-token", refreshToken);

module.exports = router;
