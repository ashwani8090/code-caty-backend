const {
  createUser,
  loginByEmailPassword,
  refreshUserToken,
} = require("../services/auth.service");
const { generateAccesAndRefreshToken } = require("../services/token.service");

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
    message: "User created successfully",
    user,
    accessToken,
  });
});

const refreshToken = catchAsync(async (req, res, next) => {
  const { refreshToken } = req.body;

  const { accessToken, refreshToken: newRefreshToken } =
    await refreshUserToken(refreshToken);

  res.status(200).send({
    accessToken: accessToken,
    refreshToken: newRefreshToken,
  });
});

module.exports = {
  registerUser,
  loginUser,
  refreshToken,
};
