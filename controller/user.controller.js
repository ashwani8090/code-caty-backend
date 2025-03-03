const catchAsync = require("../utilities/catchError");
const { getUserById } = require("../services/user.service");

const userDetails = catchAsync(async (req, res) => {
  console.log('req: ', req.user);
  const user = await getUserById(req.user.id);
  console.log('user: ', user);
  res.status(200).send(user);
});

module.exports = {
  userDetails,
};
