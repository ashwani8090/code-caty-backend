const catchAsync = require("../utilities/catchError");
const { getUserById } = require("../services/user.service");

const userDetails = catchAsync(async (req, res) => {
  const user = await getUserById(req.user.id);
  res.status(200).send({
    ...user._doc,
    ...user.image && ({
      image : process.env.BASE_URL+user.image
    })
    
  });
});

const addProfilePicture = catchAsync(async (req, res) => {
  const user = await getUserById(req.user.id);
  user.image = req.image;
  user.save()
  res.send(user);
 
});

module.exports = {
  userDetails,
  addProfilePicture
};
