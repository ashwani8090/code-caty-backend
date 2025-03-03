const User = require("../models/user.model");
const {
  createUser,
  loginByEmailPassword,
  refreshUserToken,
} = require("../services/auth.service");
const {
  generateAccesAndRefreshToken,
  verifyToken,
} = require("../services/token.service");

const catchAsync = require("../utilities/catchError");

const registerUser = catchAsync(async (req, res, next) => {
  const user = await createUser(req.body);
  res.status(200).send({
    message: "User created successfully",
    user,
  });
});

const loginUser = catchAsync(async (req, res, next) => {
  const user = await loginByEmailPassword(req.body);
  const { accessToken, refreshToken } =
    await generateAccesAndRefreshToken(user);
  user.refreshToken = refreshToken;
  await user.save();
  res.status(200).send({
    message: "User logged in successfully",
    user,
    accessToken,
  });
});

const refreshToken = catchAsync(async (req, res, next) => {
  const { refreshToken } = req.body;
  console.log("refreshToken: ", refreshToken);

  const { accessToken, refreshToken: newRefreshToken } =
    await refreshUserToken(refreshToken);

  res.status(200).send({
    accessToken: accessToken,
    refreshToken: newRefreshToken,
  });
});

const verifyEmail = catchAsync(async (req, res, next) => {
  const { token } = req.params;
  const tokenDetails = await verifyToken(token);
  const user = await User.findById(tokenDetails.id);
  if (user.isVerified) {
    return res.status(200).send({
      message: "Email is already verified",
    });
  }
  if (!user) return res.status(404).send({ message: "Invalid token" });
  user.isVerified = true;
  await user.save();
  res.status(200).send({ message: "Email verified successfully" });
});

module.exports = {
  registerUser,
  loginUser,
  refreshToken,
  verifyEmail,
};
