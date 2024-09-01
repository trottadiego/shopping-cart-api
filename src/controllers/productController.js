const Product = require("../models/Product");

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

module.exports = { getProducts, addProduct };
