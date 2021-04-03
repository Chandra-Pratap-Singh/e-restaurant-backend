const User = require("../db/models/user");

exports.addUserToDb = (newUser) => {
  const user = new User({ ...newUser });
  return user.save();
};

exports.getUserFromDb = (filter = {}, fields = "") => {
  return !!filter._id
    ? User.findById(filter._id, fields).populate("cartItems.product")
    : User.findOne({ ...filter }, fields).populate("cartItems.product");
};

exports.updateUserInDb = (updatedUser) => {
  const { _id, userId } = updatedUser;
  return _id
    ? User.findByIdAndUpdate(_id, updatedUser, { new: true })
    : User.findOneAndUpdate({ userId }, updatedUser, { new: true });
};
