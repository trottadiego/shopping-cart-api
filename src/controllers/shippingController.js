const shippingService = require("../services/shippingService");

const getShippings = async (req, res) => {
  try {
    const shippings = await shippingService.findAllShippings();
    res.status(200).json(shippings);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const addShipping = async (req, res) => {
  const { type, price, description } = req.body;
  try {
    const newShipping = await shippingService.createShipping(
      type,
      price,
      description
    );
    res.status(201).json(newShipping);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { getShippings, addShipping };
