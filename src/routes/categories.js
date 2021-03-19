const express = require("express");
const { getAllCategoryList, addCategory } = require("../controller/categories");
const router = express.Router();

router.post("/add-category", addCategory);
router.use("/", getAllCategoryList);

module.exports = router;
