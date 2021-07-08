const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");

const app = express();
app.use(bodyParser.json());

// ORDERS

const Order = mongoose.model(
  "order",
  new mongoose.Schema(
    {
      _id: {
        type: String,
        default: shortid.generate,
      },
      email: String,
      name: String,
      address: String,
      total: Number,
      cartItems: [
        {
          _id: String,
          title: String,
          price: Number,
          count: Number,
        },
      ],
    },
    {
      timestamps: true,
    }
  )
);

app.post("/api/orders", async (req, res) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.address ||
    !req.body.total ||
    !req.body.cartItems
  ) {
    return res.send({ message: "Data is required." });
  }
  const order = await Order(req.body).save();
  res.send(order);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("serve at http://localhost:5000"));

const dotenv = require("dotenv");
const cors = require("cors");

//IMPORT ROTUES
const authRoute = require("./routes/auth/auth");
const authDashboard = require("./routes/auth/authDashboard");
const productRoute = require("./routes/productRouter");

//ACCESSING THE ENVIORMENT VARIABLES
dotenv.config();

// CONNECTION TO DATABASE
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => console.log("connected to db")
);

app.use(express.json(), cors());
app.use("/api/users", authRoute);
app.use("/api/products", productRoute);
app.use("/api/dashboard", authDashboard);
