const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    const type = file.originalname.split(".")[1].toLowerCase();
    const filename = req.user.id + "." + type;
    req.image = filename;
    console.log('filename: ', filename);
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

module.exports = {
  upload: upload.single("image"),
};
