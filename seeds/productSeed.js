const mongoose = require("mongoose");
const Product = require("../src/models/Product");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/shopping-cart", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const seedProducts = async () => {
  await connectDB();
  const products = [
    {
      name: "Zapatilla Nike 1",
      price: 1000.99,
      stock: 50,
      image:
        "https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Zapatilla Nike 2",
      price: 1500.49,
      stock: 40,
      image:
        "https://images.pexels.com/photos/2404959/pexels-photo-2404959.png?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Zapatilla Nike 3",
      price: 2000.0,
      stock: 30,
      image:
        "https://images.pexels.com/photos/18946900/pexels-photo-18946900/free-photo-of-moda-hierba-cesped-estilo.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Zapatilla Nike 4",
      price: 2500.99,
      stock: 25,
      image:
        "https://images.pexels.com/photos/13600672/pexels-photo-13600672.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Zapatilla Nike 5",
      price: 3000.0,
      stock: 20,
      image:
        "https://images.pexels.com/photos/10738239/pexels-photo-10738239.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Zapatilla Nike 6",
      price: 3500.49,
      stock: 15,
      image:
        "https://images.pexels.com/photos/13236696/pexels-photo-13236696.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Zapatilla Nike 7",
      price: 4000.99,
      stock: 10,
      image:
        "https://images.pexels.com/photos/18946637/pexels-photo-18946637/free-photo-of-moda-marca-moderno-zapato.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Zapatilla Nike 8",
      price: 4500.0,
      stock: 5,
      image:
        "https://images.pexels.com/photos/10154937/pexels-photo-10154937.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Zapatilla Nike 9",
      price: 5000.49,
      stock: 8,
      image:
        "https://images.pexels.com/photos/8957613/pexels-photo-8957613.png?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Zapatilla Nike 10",
      price: 5500.0,
      stock: 12,
      image:
        "https://images.pexels.com/photos/16947163/pexels-photo-16947163/free-photo-of-acostado-nike-anuncio-naturaleza-muerta.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Zapatilla Nike 11",
      price: 2000.0,
      stock: 30,
      image:
        "https://images.pexels.com/photos/9244882/pexels-photo-9244882.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "Zapatilla Nike 12",
      price: 2500.99,
      stock: 25,
      image:
        "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("Products seeded!");
  } catch (err) {
    console.error(err.message);
  } finally {
    mongoose.connection.close();
  }
};

seedProducts();
