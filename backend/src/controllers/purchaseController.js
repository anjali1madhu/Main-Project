const Purchase = require('../models/Purchase');
const Product = require('../models/Product');

// Create a new purchase
exports.createPurchase = async (req, res) => {
  try {
    const { productId, userId } = req.body;

    // Validate product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Create purchase record
    const purchase = new Purchase({ productId, userId });
    await purchase.save();

    res.status(201).json({ message: 'Purchase completed successfully', purchase });
  } catch (error) {
    res.status(500).json({ message: 'Error creating purchase', error });
  }
};
