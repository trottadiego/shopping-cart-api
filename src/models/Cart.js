const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  id_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  id_shipping: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shipping",
    required: false,
  },
});

module.exports = mongoose.model("Cart", CartSchema);
