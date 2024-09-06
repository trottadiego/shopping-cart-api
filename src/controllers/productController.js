const Product = require("../models/Product");
const Cart = require("../models/Cart");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const addProduct = async (req, res) => {
  const { name, price, stock, imageUrl } = req.body;
  try {
    const newProduct = new Product({ name, price, stock, imageUrl });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500);
    res.status(500).send(error.message);
  }
};

const updateProductStocks = async (req, res) => {
  try {
    let cart = await Cart.findOne({ id_user: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    if (!Array.isArray(cart.products) || cart.products.length === 0) {
      return res.status(400).send("No products in the cart");
    }
    const updatePromises = cart.products.map((item) => {
      const { product_id, quantity } = item;
      return Product.findByIdAndUpdate(
        product_id._id,
        { $inc: { stock: -quantity } },
        { new: true }
      );
    });
    await Promise.all(updatePromises);
    await Cart.deleteOne({ id_user: req.user.id });
    res.status(200).json({ message: "Product stocks updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
};

module.exports = { getProducts, addProduct, updateProductStocks };
