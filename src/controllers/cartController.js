const Cart = require("../models/Cart");
const Product = require("../models/Product");

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ id_user: req.user.id }).populate(
      "products.product_id"
    );
    res.json(cart);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const addToCart = async (req, res) => {
  // codigo para agregar productos al carrito
  console.log("se agrego un nuevo producto");
};

module.exports = { getCart, addToCart };
