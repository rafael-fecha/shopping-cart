import { Schema } from 'mongoose';
const mongoose = require('mongoose');

const transactionSchema = new Schema({
  transactionId: {
    type: String,
    unique: true
  },
  amount: Number,
  items: [
    {
      itemId: Number,
      itemName: String,
      description: String,
      imageUrl: String,
      initialPrice: Number,
      finalPrice: Number,
      discount: Boolean
    }
  ]
});

// Export Mongoose model
export default mongoose.model('transaction', transactionSchema);
