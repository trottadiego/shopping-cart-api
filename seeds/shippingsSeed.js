const mongoose = require("mongoose");
const Shipping = require("../src/models/Shipping");

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

const seedShippingMethods = async () => {
  await connectDB();
  const shippingMethods = [
    {
      type: "Retiro en tienda",
      description:
        "El cliente puede retirar el pedido en nuestra tienda sin costo alguno.",
      price: 0,
    },
    {
      type: "Envío en CABA",
      description:
        "Entrega a domicilio en Capital Federal con un plazo de 24 a 48 horas hábiles. ",
      price: 500,
    },
    {
      type: "Envío a todo Argentina",
      description:
        "Cobertura de envíos a todo el país. Entrega estimada entre 5 a 7 días hábiles.",
      price: 1200,
    },
  ];

  try {
    await Shipping.deleteMany();
    await Shipping.insertMany(shippingMethods);
    console.log("Shipping methods seeded!");
  } catch (err) {
    console.error(err.message);
  } finally {
    mongoose.connection.close();
  }
};

seedShippingMethods();
