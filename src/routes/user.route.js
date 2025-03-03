const express = require("express");
const router = express.Router();
const {userDetails} = require('../controller/user.controller')

router.get("/details", userDetails);


module.exports = router;
