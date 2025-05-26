const User = require('../models/User');
const Subscription = require('../models/Subscription');
const { Parser } = require('json2csv');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    if (!users) return res.status(404).json({ message: 'User not found' });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    const subscriptions = await Subscription.find({ userId: user._id }).populate('planId');
    res.json({ user, subscriptions });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user details' });
  }
};

exports.banOrUnbanUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isBanned = !user.isBanned;
    await user.save();

    const updatedUser = await User.findById(req.params.id);


    res.json({
      message: updatedUser.isBanned ? 'User banned' : 'User unbanned',
      userId: updatedUser._id,
      isBanned: updatedUser.isBanned
    });
  } catch (err) {
    res.status(500).json({ message: 'Error updating user' });
  }
};


exports.getAllSubscriptions = async (req, res) => {
  try {
    const subs = await Subscription.find().populate('userId').populate('planId');
    res.json(subs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching subscriptions' });
  }
};

exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Subscription.find().select('paymentId amount createdAt');
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching transactions' });
  }
};

exports.exportUsersToCSV = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    const parser = new Parser();
    const csv = parser.parse(users);
    res.attachment('users.csv').send(csv);
  } catch (err) {
    res.status(500).json({ message: 'Error exporting users' });
  }
};

exports.exportTransactionsToCSV = async (req, res) => {
  try {
    const transactions = await Subscription.find().select('paymentId amount createdAt');
    const parser = new Parser();
    const csv = parser.parse(transactions);
    res.attachment('transactions.csv').send(csv);
  } catch (err) {
    res.status(500).json({ message: 'Error exporting transactions' });
  }
};
