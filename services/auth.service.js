const User = require("../models/user.model");

const { generateAccesAndRefreshToken } = require("./token.service");

const refreshUserToken = async (refreshToken) => {
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

  return User.findById(user._id).select("-password -createdAt -updatedAt -__v");
};

module.exports = {
  createUser,
  loginByEmailPassword,
  refreshUserToken,
};
