import express from 'express';
import Order from '../models/Order.js'; // Model for orders (make sure to create this model)

const router = express.Router();

// Place an order
router.post('/:userId', async (req, res) => {
  try {
    const { items, totalAmount, shippingAddress } = req.body;
    const newOrder = new Order({
      userId: req.params.userId,
      items,
      totalAmount,
      shippingAddress,
      status: 'Pending', // Initial status is 'Pending'
    });

    await newOrder.save();
    res.status(201).json({ success: true, order: newOrder });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Failed to place order' });
  }
});

// Fetch orders by user ID
router.get('/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Unable to fetch orders' });
  }
});

// Update order status (Admin only)
router.put('/:orderId', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    order.status = status;
    await order.save();
    res.status(200).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update order status' });
  }
});

export default router;
