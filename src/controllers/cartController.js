const Cart = require("../models/Cart");
const Shipping = require("../models/Shipping");

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
  const { product_id, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ id_user: req.user.id });

    if (!cart) {
      const cheapestShipping = await Shipping.findOne()
        .sort({ price: 1 })
        .limit(1);

      if (!cheapestShipping) {
        return res
          .status(500)
          .json({ message: "No shipping methods available" });
      }

      cart = new Cart({
        id_user: req.user.id,
        products: [],
        id_shipping: cheapestShipping._id,
      });
    }

    const productIndex = cart.products.findIndex(
      (p) => p.product_id.toString() === product_id
    );

    if (productIndex > -1) {
      return res
        .status(400)
        .json({ message: "The product is already in the cart" });
    }

    cart.products.push({ product_id, quantity });
    await cart.save();
    await cart.populate("products.product_id");

    res.json(cart);
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).send(error.message);
  }
};

const updateCart = async (req, res) => {
  const { product_id, quantity, id_shipping } = req.body;

  try {
    let cart = await Cart.findOne({ id_user: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const productIndex = cart.products.findIndex(
      (p) => p.product_id.toString() === product_id._id.toString()
    );

    if (productIndex > -1) {
      cart.products[productIndex].quantity = quantity;
      if (quantity <= 0) {
        cart.products.splice(productIndex, 1);
      }
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    if (id_shipping) {
      cart.id_shipping = id_shipping;
    }

    await cart.save();
    await cart.populate("products.product_id");

    res.json(cart);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const removeFromCart = async (req, res) => {
  const { product_id } = req.body;
  try {
    let cart = await Cart.findOne({ id_user: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.products = cart.products.filter(
      (p) => p.product_id.toString() !== product_id
    );

    if (cart.products.length === 0) {
      await Cart.deleteOne({ id_user: req.user.id });
      return res.json({ message: "Cart has been removed" });
    }

    await cart.save();
    await cart.populate("products.product_id");

    res.json(cart);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { getCart, addToCart, updateCart, removeFromCart };
