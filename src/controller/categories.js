const {
  getCategoryListFromDb,
  addCategoryToDb,
} = require("../services/categories");

exports.getAllCategoryList = (req, res, next) => {
  getCategoryListFromDb({}, "category")
    .then((categories) => res.status(200).json(categories))
    .catch((err) => res.status(500));
};

exports.addCategory = (req, res, next) => {
  const newCategory = req.body.category;
  addCategoryToDb({ category: newCategory })
    .then((category) => res.status(201).json(category))
    .catch((err) => res.status(500));
};
