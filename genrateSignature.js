const crypto = require('crypto');

// Replace with your real Razorpay secret key
const RAZORPAY_KEY_SECRET = 'your_razorpay_key_secret';

const razorpay_order_id = 'rzp_test_f84pRkTMIV928X';
const razorpay_payment_id = 'urKxdVTTY0iZjOpj6DrNCnXG';

const body = `${razorpay_order_id}|${razorpay_payment_id}`;
const signature = crypto
  .createHmac('sha256', RAZORPAY_KEY_SECRET)
  .update(body)
  .digest('hex');

console.log("Generated Signature:", signature);
