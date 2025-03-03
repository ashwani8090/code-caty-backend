const jwt = require("jsonwebtoken");

const generateToken = (user, token) => {
  return jwt.sign({ id: user._id, email: user.email }, token, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const generateAccesAndRefreshToken = (user) => {
  const accessToken = generateToken(user, process.env.JWT_TOKEN);
  const refreshToken = generateToken(user, process.env.JWT_REFRESH_TOKEN);
  return { accessToken, refreshToken };
};

const generateVerifyEmailToken = async (user) => {
  const verifyEmailToken = generateToken(user, process.env.JWT_TOKEN);
  return verifyEmailToken;
};

const verifyToken = async (token) => {
  await jwt.verify(token, process.env.JWT_TOKEN);
  return jwt.decode(token);
};

module.exports = {
  generateAccesAndRefreshToken,
  generateVerifyEmailToken,
  verifyToken,
};
