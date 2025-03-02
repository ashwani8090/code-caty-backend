const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).send({
      errors: {
        token: "No token provided",
      },
    });
  }
  try {
    //Bearer token
    const accessToken = token.split(" ")[1];
    const decoded = jwt.verify(accessToken, process.env.JWT_TOKEN);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send({
      errors: {
        token: "Invalid token",
        error: error
      },
    });
  }
};
module.exports = validateToken;
