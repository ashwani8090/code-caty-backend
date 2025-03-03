const express = require("express");
const router = express.Router();
const {
  userDetails,
  addProfilePicture,
} = require("../controller/user.controller");
const { upload } = require("../middleware/multer");

router.get("/details", userDetails);
router.post("/upload-profile", upload, addProfilePicture);

module.exports = router;
