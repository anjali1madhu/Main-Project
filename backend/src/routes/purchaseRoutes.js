import express from 'express';
import Purchase from '../models/purchase.js'; // Correct import of the Purchase model

const router = express.Router();

// Create a new purchase
router.post('/purchase', async (req, res) => {
  const { productId, userId } = req.body;

  if (!productId || !userId) {
    return res.status(400).json({ message: 'Product ID and User ID are required' });
  }

  try {
    const newPurchase = new Purchase({ productId, userId });
    await newPurchase.save();
    res.status(201).json({ message: 'Purchase created successfully', purchase: newPurchase });
  } catch (error) {
    res.status(500).json({ message: 'Error creating purchase', error: error.message });
  }
});

// Get all purchases
router.get('/purchases', async (req, res) => {
  try {
    const purchases = await Purchase.find()
      .populate('productId', 'name price') // Populating product details
      .populate('userId', 'name email'); // Populating user details
    res.status(200).json({ purchases });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching purchases', error: error.message });
  }
});

export default router;
