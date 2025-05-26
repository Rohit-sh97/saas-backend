const express = require('express');
const router = express.Router();
const userController= require('../controllers/userController');
const auth = require('../middleware/auth');

router.get('/profile', auth, userController.getProfile);
router.get('/subscriptions', auth, userController.getUserSubscriptions);
router.get('/invoices', auth, userController.getInvoices);

module.exports = router;