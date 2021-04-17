exports["PRODUCT_UPDATION_FAILED"] = "Product updation failed";
const {
  ADMIN_PRODUCT_PROPERTY,
  CATEGORY_ADDITION_FAILED,
  CATEGORIES_FETCHING_FAILED,
  PRODUCTS_FETCHING_FAILED,
  PRODUCT_FETCHING_FAILED,
  PRODUCT_ADDITION_FAILED,
  PRODUCT_DELETION_FAILED,
  ORDER_STATES,
  CANNOT_GET_ORDERS,
  CANNOT_UPDATE_ORDER_STATUS,
  CANNOT_FIND_ORDER,
} = require("../constants");
const {
  getCategoryListFromDb,
  addCategoryToDb,
} = require("../services/categories");
const {
  getOrderFromDb,
  getOrderListFromDb,
  updateOrderInDb,
  countOrdersInDb,
} = require("../services/orders");
const {
  getProductListFromDb,
  getProductFromDb,
  updateProductInDb,
  addProductToDb,
  deleteProductFromDb,
  countProductsInDb,
} = require("../services/products");

const { generateRandomUniqueId } = require("../util");

exports.getAllCategoryList = (req, res, next) => {
  getCategoryListFromDb(null, "category")
    .then((categories) => res.status(200).json(categories))
    .catch((err) => res.status(500).json(CATEGORIES_FETCHING_FAILED));
};

exports.addCategory = (req, res, next) => {
  const newCategory = req.body.category;
  addCategoryToDb({ category: newCategory })
    .then((category) => res.status(201).json(category))
    .catch((err) => res.status(500).json(CATEGORY_ADDITION_FAILED));
};

exports.getAllProductList = async (req, res, next) => {
  const pageNumber = req.query ? +req.query.pageNumber : null;
  const limit = req.query ? +req.query.pageLimit : null;
  const skip = !!pageNumber && !!limit ? (pageNumber - 1) * limit : null;
  const totalCount = await countProductsInDb();
  getProductListFromDb(null, ADMIN_PRODUCT_PROPERTY, skip, limit)
    .then((products) => res.status(200).json({ products, totalCount }))
    .catch((err) => res.status(500).json(PRODUCTS_FETCHING_FAILED));
};

exports.getProduct = (req, res, next) => {
  const filter = { productId: req.params.productId };
  getProductFromDb(filter, ADMIN_PRODUCT_PROPERTY)
    .then((product) => res.status(200).json(product))
    .catch((err) => res.status(500).json(PRODUCT_FETCHING_FAILED));
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
    .catch((err) =>
      res
        .status(500)
        .json(!!product._id ? PRODUCT_UPDATION_FAILED : PRODUCT_ADDITION_FAILED)
    );
};

exports.deleteProduct = (req, res, next) => {
  const productId = req.params.productId || "";
  deleteProductFromDb(productId)
    .then((product) => res.status(200).json(product))
    .catch((err) => res.status(500).json(PRODUCT_DELETION_FAILED));
};

exports.getCompletedOrders = async (req, res, next) => {
  const filters = { status: ORDER_STATES.DELIVERED };
  const pageNumber = req.query ? +req.query.pageNumber : null;
  const limit = req.query ? +req.query.pageLimit : null;
  const skip = !!pageNumber && !!limit ? (pageNumber - 1) * limit : null;
  const totalCount = await countOrdersInDb(filters);
  getOrderListFromDb(filters, null, skip, limit)
    .then((orders) => res.status(200).json({ orders, totalCount }))
    .catch((err) => res.status(500).json(CANNOT_GET_ORDERS));
};

exports.getRejectedOrders = async (req, res, next) => {
  const filters = { status: ORDER_STATES.REJECTED };
  const pageNumber = req.query ? +req.query.pageNumber : null;
  const limit = req.query ? +req.query.pageLimit : null;
  const skip = !!pageNumber && !!limit ? (pageNumber - 1) * limit : null;
  const totalCount = await countOrdersInDb(filters);
  getOrderListFromDb(filters, null, skip, limit)
    .then((orders) => res.status(200).json({ orders, totalCount }))
    .catch((err) => res.status(500).json(CANNOT_GET_ORDERS));
};

exports.getActiveOrders = (req, res, next) => {
  const filter = {
    $or: [
      { status: { $ne: ORDER_STATES.DELIVERED } },
      { status: { $ne: ORDER_STATES.DELIVERED } },
    ],
  };
  getOrderListFromDb(filter)
    .then((orders) => res.status(200).json(orders))
    .catch((err) => res.status(500).json(CANNOT_GET_ORDERS));
};

exports.updateOrderStatus = async (req, res, next) => {
  const orderId = req.body.orderId;
  const newStatus = req.body.newStatus;
  let order;
  try {
    order = await getOrderFromDb({ orderId });
  } catch {
    res.status(500).json({ message: CANNOT_FIND_ORDER });
  }
  if (newStatus === ORDER_STATES.DELIVERED) order.deliveryDateTime = Date.now();
  order.history.push({
    from: order.status,
    to: newStatus,
    time: new Date(),
    comment: "",
  });
  order.status = newStatus;
  updateOrderInDb(order)
    .then((order) => res.status(200).json(order))
    .catch((err) => res.status(500).json(CANNOT_UPDATE_ORDER_STATUS));
};
