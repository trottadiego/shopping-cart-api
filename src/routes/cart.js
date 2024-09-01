const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { getCart, addToCart } = require("../controllers/cartController");

router.get("/", auth, getCart);
router.post("/add", auth, addToCart);

module.exports = router;
