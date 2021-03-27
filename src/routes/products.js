const express = require("express");
const {
  getAllProductList,
  createProduct,
  getProduct,
  updateProduct,
  getUniqueProductCategoryList,
} = require("../controller/products");
const { authorize } = require("../middlewares/auth");
const router = express.Router();

router.post("/product", authorize, createProduct);
router.get("/categories", authorize, getUniqueProductCategoryList);
router.get("/:productId", authorize, getProduct);
router.patch("/product", authorize, updateProduct);
router.get("/", authorize, getAllProductList);

module.exports = router;
