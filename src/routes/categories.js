const express = require("express");
const { getAllCategoryList, addCategory } = require("../controller/categories");
const { authorizeAdmin } = require("../middlewares/auth");
const router = express.Router();

router.post("/add-category", authorizeAdmin, addCategory);
router.use("/", authorizeAdmin, getAllCategoryList);

module.exports = router;
