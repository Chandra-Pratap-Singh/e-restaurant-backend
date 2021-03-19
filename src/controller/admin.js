const { ADMIN_PRODUCT_PROPERTY } = require("../constants");
const {
  getCategoryListFromDb,
  addCategoryToDb,
} = require("../services/categories");
const {
  getProductListFromDb,
  getProductFromDb,
  updateProductInDb,
  addProductToDb,
} = require("../services/products");

const { generateRandomUniqueId } = require("../util");

exports.getAllCategoryList = (req, res, next) => {
  getCategoryListFromDb(null, "category")
    .then((categories) => res.status(200).json(categories))
    .catch((err) => res.status(500));
};

exports.addCategory = (req, res, next) => {
  const newCategory = req.body.category;
  addCategoryToDb({ category: newCategory })
    .then((category) => res.status(201).json(category))
    .catch((err) => res.status(500));
};

exports.getAllProductList = (req, res, next) => {
  getProductListFromDb(null, ADMIN_PRODUCT_PROPERTY)
    .then((products) => res.status(200).json(products))
    .catch((err) => res.status(500));
};

exports.getProduct = (req, res, next) => {
  const filter = { productId: req.params.productId };
  getProductFromDb(filter, ADMIN_PRODUCT_PROPERTY)
    .then((product) => res.status(200).json(product))
    .catch((err) => res.status(500).json(err));
};

exports.addOrUpdateProduct = (req, res, next) => {
  const product = req.body.product;
  if (!product.productId) {
    product.productId = generateRandomUniqueId();
  }
  const response = !!product._id
    ? updateProductInDb(product)
    : addProductToDb(product);
  response
    .then((product) => res.status(201).json(product))
    .catch((err) => res.status(500).json(err));
};
