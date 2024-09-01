const express = require("express");
const router = express.Router();
const { getProducts, addProduct } = require("../controllers/productController");

router.get("/", getProducts);
router.get("/add", addProduct);

module.exports = router;
