const express = require("express");
const connectDB = require("./src/config");
const authRoutes = require("./src/routes/auth");
const productRoutes = require("./src/routes/product");
const cartRoutes = require("./src/routes/cart");
const cors = require("cors");

const app = express();

connectDB();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
