const express = require("express");
const app = express();
const routes = require("./routes");
const port = 3000;
const connectDB = require("./utilities/connectDb");
require('dotenv').config()

connectDB();

app.use(express.json());
app.use("/", routes);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
