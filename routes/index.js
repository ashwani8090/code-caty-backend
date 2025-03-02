const express = require("express");
const router = express.Router();
const authRoutes = require("./auth.route");
const userRoutes = require("./user.route");
const validateToken = require("../middleware/validateToken");

router.use("/auth", authRoutes);
router.use("/user", validateToken, userRoutes);

module.exports = router;
