const User = require("../models/user.model");

const getUserById = async (id) => {
  console.log('id: ', id);
  return User.findById(id).select("-password");
};

module.exports = {
  getUserById,
};
