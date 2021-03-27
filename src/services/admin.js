const Admin = require("../db/models/admin");

exports.getAdminFromDb = () => {
  return Admin.find();
};
