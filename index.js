const express = require("express");
const app = express();
const routes = require("./routes");
const port = 3000;
const connectDB = require("./utilities/connectDb");
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();
const cors = require("cors");

connectDB();

app.use(cors());
app.use(express.json());
app.use("/", routes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
