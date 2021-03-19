const Category = require("../db/models/category");

exports.getCategoryListFromDb = (filters = {}, fields) => {
  return Category.find({ ...filters }, fields);
};

exports.getCategoryFromDb = (filter = {}, fields) => {
  return !!filter._id
    ? Category.findById(filter._id, fields)
    : Category.findOne({ ...filter }, fields);
};

exports.addCategoryToDb = (newCategory) => {
  const category = new Category({ ...newCategory });
  return category.save();
};
