exports.SHOP_PRODUCT_PROPERTY = [
  "name",
  "img",
  "price",
  "rating",
  "ratingProvider",
  "description",
  "category",
  "productId",
];

exports.ADMIN_PRODUCT_PROPERTY = [
  "name",
  "img",
  "price",
  "description",
  "category",
  "productId",
];

exports.USER_PROPERTIES = ["userId", "name", "phone", "email", "addresses"];

exports["PRODUCT_ADDITION_FAILED"] = "Product addition failed";
exports["PRODUCT_FETCHING_FAILED"] = "Product fetching failed";
exports["PRODUCT_UPDATION_FAILED"] = "Product updation failed";
exports["PRODUCTS_FETCHING_FAILED"] = "Products fetching failed";
exports["PRODUCTS_DELETION_FAILED"] = "Products Deletion failed";
exports["CATEGORY_ADDITION_FAILED"] = "Category addition failed";
exports["CATEGORY_FETCHING_FAILED"] = "Category fetching failed";
exports["CATEGORIES_FETCHING_FAILED"] = "Categories fetching failed";
exports["SIGNUP_FAILED"] = "Singup Failed";
exports["EMAIL_DOES_NOT_EXISTS"] = "No User found with the given email";
exports["WRONG_PASSWORD"] = "Wrong Password";
exports["LOGIN_FAILED"] = "Login Failed";
exports.AUTHORIZATION_FAILED = "Authorization failed";
exports.ITEM_NOT_ADDED_TO_CART = "Item was not added to the Cart";
exports.ITEM_NOT_REMOVED_FROM_CART = "Item was not removed from the Cart";
exports.USER_NOT_FOUND = "User not found";
exports.CANNOT_UPDATE_USER = "Cannot update user";
exports.CANNOT_GET_USER = "Cannot get user";
exports.ORDER_FAILED = "Order failed";
exports.CANNOT_GET_ORDER = "Cannot get orders";
exports.ORDER_STATES = {
  CART: "Cart",
  REQUESTED: "Requested",
  ACCEPTED: "Accepted",
  IN_KITCHEN: "In Kitchen",
  READY: "Ready",
  ON_WAY: "On Way",
};
