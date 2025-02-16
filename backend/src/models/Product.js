// src/models/Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  // other fields...
});

// Default export
const Product = mongoose.model('Product', productSchema);
export default Product; // Ensure this is the default export
