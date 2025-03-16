const express = require("express");
const app = express();
const routes = require("./routes");
const port = 3000;
const connectDB = require("./utilities/connectDB");
const errorHandler = require("./middleware/errorHandler");
const {config} = require("dotenv")
const cors = require("cors");

config();
connectDB();
app.use(express.static('public'))
app.use(cors());
app.use(express.json());
app.use("/", routes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
