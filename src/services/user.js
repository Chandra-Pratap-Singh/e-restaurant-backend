const User = require("../db/models/user");

exports.addUserToDb = (newUser) => {
  const user = new User({ ...newUser });
  return user.save();
};

// exports.getProductListFromDb = (filters = {}, fields) => {
//   return Product.find({ ...filters }, fields);
// };

exports.getUserFromDb = (filter = {}, fields) => {
  return !!filter._id
    ? User.findById(filter._id, fields)
    : User.findOne({ ...filter }, fields);
};

exports.updateUserInDb = (updatedUser) => {
  const { _id, userId } = updatedUser;
  return _id
    ? User.findByIdAndUpdate(_id, updatedUser, { new: true })
    : User.findOneAndUpdate({ userId }, updatedUser, { new: true });
};
