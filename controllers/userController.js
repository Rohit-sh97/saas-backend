const User = require('../models/User');
const Subscription = require('../models/Subscription');
const mongoose = require('mongoose');


exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      res.json({ message: "User not exist"})
    }else {
res.json(user);
    }

  } catch (err) {
    res.status(500).json({ message: 'Error fetching profile' });
  }
};

exports.getInvoices = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ userId: req.user.userId }).select('amountPaid purchaseDate status');
    res.json(subscriptions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching invoices' });
  }
};


exports.getUserSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ userId: req.user.userId })
      .populate('productId')  
      .populate('planId');  
 
    res.json(subscriptions);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error fetching subscriptions' });
  }
};

