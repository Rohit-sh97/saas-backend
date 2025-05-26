const mongoose = require('mongoose');

const TranscationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    subscriptionId: { type: mongoose.Schema.Types,ObjectId, reg: 'Subscription' },
    amount: Number,
    date: Date,
    paymentId: String,
    method: String
});

module.exports = mongoose.model('Transcation', TranscationSchema)