const {
  getCategoryListFromDb,
  addCategoryToDb,
} = require("../services/categories");

const {
  CATEGORIES_FETCHING_FAILED,
  CATEGORY_ADDITION_FAILED,
} = require("../constants");

exports.getAllCategoryList = (req, res, next) => {
  getCategoryListFromDb({}, "category")
    .then((categories) => res.status(200).json(categories))
    .catch((err) => res.status(500).json(CATEGORIES_FETCHING_FAILED));
};

exports.addCategory = (req, res, next) => {
  const newCategory = req.body.category;
  addCategoryToDb({ category: newCategory })
    .then((category) => res.status(201).json(category))
    .catch((err) => res.status(500).json(CATEGORY_ADDITION_FAILED));
};
