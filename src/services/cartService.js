const Cart = require("../models/Cart");

const findCartByUserId = async (userId) => {
  return Cart.findOne({ id_user: userId }).populate("products.product_id");
};

const createCartForUser = async (userId, shippingId) => {
  const newCart = new Cart({
    id_user: userId,
    products: [],
    id_shipping: shippingId,
  });
  return newCart.save();
};

const addProductToCart = (cart, productId, quantity) => {
  cart.products.push({ product_id: productId, quantity });
  return cart.save();
};

const updateProductInCart = async (cart, productId, quantity) => {
  const productIndex = cart.products.findIndex(
    (p) => p.product_id._id.toString() === productId._id.toString()
  );

  if (productIndex > -1) {
    cart.products[productIndex].quantity = quantity;
    if (quantity <= 0) {
      cart.products.splice(productIndex, 1);
    }
  } else {
    throw new Error("Product not found in cart");
  }
  return cart.save();
};

const removeProductFromCart = async (cart, productId) => {
  cart.products = cart.products.filter(
    (p) => p.product_id._id.toString() !== productId
  );
  return cart.save();
};

const removeCart = async (userId) => {
  return Cart.deleteOne({ id_user: userId });
};

module.exports = {
  findCartByUserId,
  createCartForUser,
  addProductToCart,
  updateProductInCart,
  removeProductFromCart,
  removeCart,
};
