const User = require("../models/user.model");
const { sendVerificationEmail } = require("./email.service");

const {
  generateAccesAndRefreshToken,
  generateVerifyEmailToken,
} = require("./token.service");

const refreshUserToken = async (refreshToken) => {
  console.log("refreshToken: ", refreshToken);
  if (!refreshToken) {
    throw new Error("Token Not found");
  }
  const user = await User.findOne({ refreshToken });
  if (!user) {
    throw new Error("Invalid token");
  }

  const { accessToken, refreshToken: newRefreshToken } =
    await generateAccesAndRefreshToken(user);
  user.refreshToken = newRefreshToken;
  await user.save();

  return { accessToken, refreshToken: newRefreshToken };
};

const createUser = async (body) => {
  if (await User.isEmailTaken(body.email)) {
    throw new Error("Email is already taken");
  }
  const user = await User.create(body);
  const token = await generateVerifyEmailToken(user);
  await sendVerificationEmail(user.email, token);
  return User.findById(user._id).select("-password -createdAt -updatedAt -__v");
};

const loginByEmailPassword = async (body) => {
  const user = await User.findOne({
    email: body.email,
  });
  if (!user) {
    throw new Error("Email not found");
  }
  const isMatch = await user.comparePassword(body.password);
  if (!isMatch) {
    throw new Error("Password is incorrect");
  }
  if (!user.isVerified) {
    throw new Error("Email is not verified");
  }

  return User.findById(user._id).select("-password -createdAt -updatedAt -__v");
};

module.exports = {
  createUser,
  loginByEmailPassword,
  refreshUserToken,
};
