const express = require("express");
const {
  addItemToCart,
  removeItemFromCart,
  getCartItems,
  checkout,
  getUser,
  getOderList,
} = require("../controller/user");
const { authorize } = require("../middlewares/auth");

const router = express.Router();

router.get("/", authorize, getUser);
router.get("/cart-items", authorize, getCartItems);
router.put("/add-cart-item", authorize, addItemToCart);
router.post("/remove-cart-item", authorize, removeItemFromCart);
router.put("/checkout", authorize, checkout);
router.get("/orders", authorize, getOderList);

module.exports = router;
