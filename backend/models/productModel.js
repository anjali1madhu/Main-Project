const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  productImage: { type: String, required: true }, // Store the image URL or path
  productWeight: { type: String, required: true },
  productPrice: { type: Number, required: true },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
