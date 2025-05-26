const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  planId: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan' },
  purchaseDate: Date,
  expiryDate: Date,
  status: { type: String, enum: ['Active', 'Expire'], default: 'Active' },
  amountPaid: Number,
});

const Subscription = mongoose.model('Subscription', SubscriptionSchema);

module.exports = Subscription; 
