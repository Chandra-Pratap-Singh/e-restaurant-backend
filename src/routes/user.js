const express = require("express");
const {
  addItemToCart,
  removeItemFromCart,
  getCartItems,
  checkout,
  getUser,
  getOderList,
  addOrUpdateAddress,
  deleteAddress,
  updateUserProfile,
} = require("../controller/user");
const { authorize } = require("../middlewares/auth");

const router = express.Router();

router.get("/", authorize, getUser);
router.get("/cart-items", authorize, getCartItems);
router.put("/add-cart-item", authorize, addItemToCart);
router.post("/remove-cart-item", authorize, removeItemFromCart);
router.put("/checkout", authorize, checkout);
router.get("/orders", authorize, getOderList);
router.put("/address", authorize, addOrUpdateAddress);
router.delete("/address/:addressId", authorize, deleteAddress);
router.patch("/user-profile", authorize, updateUserProfile);

module.exports = router;
