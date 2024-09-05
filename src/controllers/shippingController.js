const Shipping = require("../models/Shipping");

const getSippings = async (req, res) => {
  try {
    const products = await Shipping.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const addShipping = async (req, res) => {
  const { type, price, description } = req.body;
  try {
    const newShipping = new Shipping({ type, price, description });
    await newShipping.save();
    res.status(201).json(newShipping);
  } catch (error) {
    res.status(500);
    res.status(500).send(error.message);
  }
};

module.exports = { getSippings, addShipping };
