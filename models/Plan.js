const mongoose = require('mongoose');

const PlanSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: { type: String, enum: ['Basic', 'Advanced', 'Premium'] },
    price: { type: Number, required: true},
    featuresCount: Number,
    features: [String],
    createdAt: { type: Date, default: Date.now }
});

const Plan = mongoose.model('Plan', PlanSchema);
module.exports = Plan;