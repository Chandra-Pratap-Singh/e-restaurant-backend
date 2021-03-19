const express = require("express");
const {
  getAllProductList,
  createProduct,
  getProduct,
  updateProduct,
  getUniqueProductCategoryList,
} = require("../controller/products");
const router = express.Router();

router.post("/product", createProduct);
router.get('/categories', getUniqueProductCategoryList)
router.get("/:productId", getProduct);
router.get("/", getAllProductList);
router.patch("/product", updateProduct);

module.exports = router;
