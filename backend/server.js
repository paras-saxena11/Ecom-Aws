const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
require("dotenv").config();
const stripe = require("stripe")(
  "sk_test_51MM7AsSGjzXbWRQSnOHqDYfXJdZcMVeb0ZmkPkBHOnc2zkTBIyQfN5WM7N7ODBeyZisognqlloIWZlhuIfVox7mA009jg6XLAu"
);
const PORT = 8080;
require("./connection");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: "*",
  methods: ["GET", "POST", "PATCH", "DELETE"],
});

// const User = require("./models/User");
const userRoutes = require("./routes/userRoutes");
const imageRoutes = require("./routes/imageRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/images", imageRoutes);
app.use("/orders", orderRoutes);

app.post("/create-payment", async (req, res) => {
  const { amount } = req.body;
  // console.log(amount);
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "INR",
      payment_method_types: ["card"],
    });

    // console.log(paymentIntent);

    res.status(200).json(paymentIntent);
  } catch (e) {
    console.log(e.message);
    res.status(400).json(e.message);
  }
});

server.listen(PORT, () => {
  console.log("server running at port", 8080);
});

app.set("socketio", io);
