const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true},
  phone: String,
  password: String,
  isVerified: { type: Boolean, default: false },
  isBanned: { type: Boolean, default: false },
  createdAt: {type: Date, default: Date.now}
});

const User = mongoose.model('User', UserSchema);

module.exports = User;