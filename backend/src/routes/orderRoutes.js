const express = require("express");
const Order = require("../models/Order");
const router = express.Router();

// Create an order
router.post("/orders", async (req, res) => {
  try {
    const { userId, items, totalAmount } = req.body;
    const newOrder = new Order({ userId, items, totalAmount });
    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully!", order: newOrder });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get orders for a specific user
router.get("/orders/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
