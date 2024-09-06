const cartService = require("../services/cartService");
const shippingService = require("../services/shippingService");

const getCart = async (req, res) => {
  try {
    const cart = await cartService.findCartByUserId(req.user.id);

    res.json(cart);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const addToCart = async (req, res) => {
  const { product_id, quantity } = req.body;

  try {
    let cart = await cartService.findCartByUserId(req.user.id);

    if (!cart) {
      const cheapestShipping = await shippingService.findCheapestShipping();
      if (!cheapestShipping) {
        return res
          .status(500)
          .json({ message: "No shipping methods available" });
      }
      cart = await cartService.createCartForUser(
        req.user.id,
        cheapestShipping._id
      );
    }

    const productExists = cart.products.some(
      (p) => p.product_id.toString() === product_id
    );
    if (productExists) {
      return res.status(400).json({ message: "Product already in cart" });
    }

    await cartService.addProductToCart(cart, product_id, quantity);
    await cart.populate("products.product_id");

    res.json(cart);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateCart = async (req, res) => {
  const { product_id, quantity, id_shipping } = req.body;

  try {
    let cart = await cartService.findCartByUserId(req.user.id);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    await cartService.updateProductInCart(cart, product_id, quantity);

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
    let cart = await cartService.findCartByUserId(req.user.id);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    await cartService.removeProductFromCart(cart, product_id);

    if (cart.products.length === 0) {
      await cartService.removeCart(req.user.id);
      return res.json({ message: "Cart has been removed" });
    }

    await cart.populate("products.product_id");
    res.json(cart);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { getCart, addToCart, updateCart, removeFromCart };
