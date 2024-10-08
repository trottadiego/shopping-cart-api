const mongoose = require("mongoose");

const ShippingSchema = new mongoose.Schema({
  type: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("Shipping", ShippingSchema);
