const express = require("express");
const router = express.Router();
const User = require("../models/user.model");

router.get("/details", async (req, res) => {
    console.log('data: ', req.user);
  const user = await User.findById(req.user.id).select("-password");

  res.status(200).send(user);
});

module.exports = router;
