import mongoose from 'mongoose';

const purchaseSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  purchaseDate: { type: Date, default: Date.now },
});

const Purchase = mongoose.model('Purchase', purchaseSchema);

export default Purchase;
