const productService = require("../services/productService");

const getProducts = async (req, res) => {
  try {
    const products = await productService.findAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const addProduct = async (req, res) => {
  const { name, price, stock, imageUrl } = req.body;

  try {
    const newProduct = await productService.createProduct(
      name,
      price,
      stock,
      imageUrl
    );
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateProductStocks = async (req, res) => {
  try {
    let cart = await productService.findCartByUserId(req.user.id);

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    if (!Array.isArray(cart.products) || cart.products.length === 0) {
      return res.status(400).json({ message: "No products in the cart" });
    }

    const updatePromises = cart.products.map((item) =>
      productService.updateProductStock(item.product_id._id, item.quantity)
    );

    await Promise.all(updatePromises);
    await productService.removeCart(req.user.id);

    res.status(200).json({ message: "Product stocks updated successfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { getProducts, addProduct, updateProductStocks };
