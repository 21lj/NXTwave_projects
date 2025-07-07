const express = require("express");
const Cart = require("../models/Cart");
const Order = require("../models/Orders");
const Product = require("../models/Product");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/", protect, async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");
  if (!cart || cart.items.length === 0)
    return res.status(400).json({ error: "Cart is empty" });

  const orderItems = cart.items.map((item) => ({
    productId: item.product._id,
    name: item.product.name,
    price: item.product.price,
    quantity: item.quantity
  }));

  const totalAmount = orderItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const order = await Order.create({
    user: req.user.id,
    items: orderItems,
    totalAmount
  });

  cart.items = [];
  await cart.save();

  res.status(201).json(order);
});

router.get("/", protect, async (req, res) => {
    const orders = await Order.find({
        user: req.user.id
    }).sort({
        createdAt: -1
    });
    res.json(orders)
});

module.exports = router;