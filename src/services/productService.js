const Product = require("../models/Product");
const Cart = require("../models/Cart");

const findAllProducts = async () => {
  return Product.find();
};

const createProduct = async (name, price, stock, imageUrl) => {
  const newProduct = new Product({ name, price, stock, imageUrl });
  return newProduct.save();
};

const findCartByUserId = async (userId) => {
  return Cart.findOne({ id_user: userId }).populate("products.product_id");
};

const updateProductStock = async (productId, quantity) => {
  return Product.findByIdAndUpdate(
    productId,
    { $inc: { stock: -quantity } },
    { new: true }
  );
};

const removeCart = async (userId) => {
  return Cart.deleteOne({ id_user: userId });
};

module.exports = {
  findAllProducts,
  createProduct,
  findCartByUserId,
  updateProductStock,
  removeCart,
};
