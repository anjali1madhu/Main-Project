import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  product: {
    img: String,
    name: String,
    price: String,
    id: Number,
    quantity: {
      type: Number,
      default: 1,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CartItem = mongoose.model('CartItem', cartItemSchema);

export default CartItem;
