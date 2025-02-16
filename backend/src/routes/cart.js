import express from 'express';
import mongoose from 'mongoose';

// Define a schema for the "Buy Now" orders
const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'Pending' }, // Order status: Pending, Completed, Cancelled
  createdAt: { type: Date, default: Date.now },
});

// Create a model for orders
const Order = mongoose.model('Order', orderSchema);

const router = express.Router();

// POST route to place an order
router.post('/place-order', async (req, res) => {
  const { userId, productId, quantity, totalAmount } = req.body;

  if (!userId || !productId || !quantity || !totalAmount) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newOrder = new Order({ userId, productId, quantity, totalAmount });
    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    res.status(500).json({ message: 'Order placement failed', error: error.message });
  }
});

// GET route to fetch all orders of a user
router.get('/user-orders/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.find({ userId }).populate('productId', 'name price'); // Populate product details if needed
    res.status(200).json({ message: 'Orders fetched successfully', orders });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
});

// PUT route to update order status
router.put('/update-status/:orderId', async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: 'Order status is required' });
  }

  try {
    const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order status updated successfully', order: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update order status', error: error.message });
  }
});

export default router;
