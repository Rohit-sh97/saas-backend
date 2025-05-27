const razorpay = require('../config/razorpay');
const crypto = require('crypto');
const Subscription = require('../models/Subscription');

exports.checkout = async (req, res) => {
  try {
    const { amount, planId } = req.body;
    const options = {
      amount: amount * 100,
      currency: 'INR',
      receipt: `receipt_order_${Math.random()}`
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json({ order });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Checkout error' });
  }
};

exports.verifyPayment = async (req, res) => {
  try {

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId, planId, amount } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
  return res.status(400).json({ message: 'Missing required fields' });
}
    

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      const subscription = new Subscription({
        userId,
        planId,
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        amount,
        status: 'Active'
      });

      await subscription.save();
      res.status(200).json({ message: 'Payment verified', subscription });
    } else {
      console.log("Expected:", expectedSignature);
console.log("Received:", razorpay_signature);

      res.status(400).json({ message: 'Invalid signature' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Verification error' });
  }
};
