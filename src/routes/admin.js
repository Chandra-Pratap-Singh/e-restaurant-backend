const express = require("express");
const {
  addCategory,
  getAllCategoryList,
  getProduct,
  addOrUpdateProduct,
  deleteProduct,
} = require("../controller/admin");
const { getAllProductList } = require("../controller/admin");
const router = express.Router();

router.get("/product/:productId", getProduct);
router.get("/product-list", getAllProductList);
router.get("/product-categories", getAllCategoryList);
router.post("/product-category", addCategory);
router.put("/product", addOrUpdateProduct);
router.delete("/product/:productId", deleteProduct);

module.exports = router;
