const express = require("express");
const router = express.Router();
const {
  getSippings,
  addShipping,
} = require("../controllers/shippingController");

router.get("/", getSippings);
router.post("/add", addShipping);

module.exports = router;
