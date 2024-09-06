const express = require("express");
const router = express.Router();
const {
  getShippings,
  addShipping,
} = require("../controllers/shippingController");

router.get("/", getShippings);
router.post("/add", addShipping);

module.exports = router;
