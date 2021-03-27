const express = require("express");
const {
  addCategory,
  getAllCategoryList,
  getProduct,
  addOrUpdateProduct,
  deleteProduct,
} = require("../controller/admin");
const { getAllProductList } = require("../controller/admin");
const { authorizeAdmin } = require("../middlewares/auth");
const router = express.Router();

router.get("/product/:productId", authorizeAdmin, getProduct);
router.get("/product-list", authorizeAdmin, getAllProductList);
router.get("/product-categories", authorizeAdmin, getAllCategoryList);
router.post("/product-category", authorizeAdmin, addCategory);
router.put("/product", authorizeAdmin, addOrUpdateProduct);
router.delete("/product/:productId", authorizeAdmin, deleteProduct);

module.exports = router;
