const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const PORT = 8080;
require("./connection");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: "*",
  methods: ["GET", "POST", "PATCH", "DELETE"],
});
// const path = require("path");

// const _dirname = path.dirname("");
// const build_path = path.join(_dirname, "../frontend/build");

// app.use(express.static(build_path));

// app.get("/*", function (req, res) {
//   res.sendFile(path.join(__dirname, "../frontend/build/index.html")),
//     function (error) {
//       if (error) {
//         res.status(500).send(error);
//       }
//     };
// });

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
      currency: "usd",
      payment_method_types: ["card"],
    });
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
