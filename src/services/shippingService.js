const Shipping = require("../models/Shipping");

const findAllShippings = async () => {
  return Shipping.find();
};
const findCheapestShipping = async () => {
  return Shipping.findOne().sort({ price: 1 }).limit(1);
};
const createShipping = async (type, price, description) => {
  const newShipping = new Shipping({ type, price, description });
  return newShipping.save();
};

module.exports = {
  findAllShippings,
  findCheapestShipping,
  createShipping,
};
