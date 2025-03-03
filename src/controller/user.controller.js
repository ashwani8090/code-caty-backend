const catchAsync = require("../utilities/catchError");
const { getUserById } = require("../services/user.service");

const userDetails = catchAsync(async (req, res) => {
  const user = await getUserById(req.user.id);
  res.status(200).send(user);
});

module.exports = {
  userDetails,
};
