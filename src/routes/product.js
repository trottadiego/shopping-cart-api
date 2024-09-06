const express = require("express");
const router = express.Router();
const {
  getProducts,
  addProduct,
  updateProductStocks,
} = require("../controllers/productController");
const auth = require("../middleware/auth");

router.get("/", getProducts);
router.get("/add", addProduct);
router.put("/update-stocks", auth, updateProductStocks);

module.exports = router;
