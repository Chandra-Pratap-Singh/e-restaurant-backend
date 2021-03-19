const { SHOP_PRODUCT_PROPERTY } = require("../constants");
const {
  addProductToDb,
  getProductListFromDb,
  updateProductInDb,
  getProductFromDb,
  getUniqueProductCategoryListFromDb,
} = require("../services/products");
const { getCategoryFromDb } = require("../services/categories");
const { getRandomNumber } = require("../util");

exports.getAllProductList = async (req, res, next) => {
  const category = req.query ? req.query.category : null;
  const filter = {};
  if (!!category) {
    const { _id } = await getCategoryFromDb({ category });
    filter.category = _id;
  }
  getProductListFromDb(filter, SHOP_PRODUCT_PROPERTY.join(" "))
    .then((productList) => res.status(200).json(productList))
    .catch((err) => res.status(500).json(err));
};

exports.getProduct = (req, res, next) => {
  const filter = { productId: req.params.productId };
  getProductFromDb(filter, SHOP_PRODUCT_PROPERTY.join(" "))
    .then((product) => res.status(200).json(product))
    .catch((err) => res.status(500).json(err));
};

exports.getUniqueProductCategoryList = (req, res, next) => {
  getUniqueProductCategoryListFromDb()
    .then((categories) => res.status(200).json(categories))
    .catch((err) => res.status(500).json(err));
};

exports.updateProduct = (req, res, next) => {
  const updatedProduct = req.body.product;
  updateProductInDb(updatedProduct)
    .then((product) => res.status(201).json(product))
    .catch((err) => res.status(500).json(err));
};

exports.createProduct = (req, res, next) => {
  const {
    name,
    img,
    price,
    rating,
    ratingProvider,
    description,
    category,
  } = req.body.product;
  const newProduct = {
    name,
    img,
    price,
    rating,
    ratingProvider,
    description,
    category,
    productId: `${Date.now()}${getRandomNumber(2)}`,
  };
  addProductToDb(newProduct)
    .then((product) => res.status(201).json(product))
    .catch((err) => res.status(500).json(err));
};
