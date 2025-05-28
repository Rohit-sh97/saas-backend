const express = require('express');
const router = express.Router();
const  AuthMiddelware  = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');
const adminController = require('../controllers/adminController');


router.get('/users', adminMiddleware, adminController.getAllUsers);
router.get('/user/:id', adminMiddleware , adminController.getUserDetails);
router.put('/user/:id/ban', adminMiddleware, adminController.banOrUnbanUser);
router.get('/subscriptions', adminMiddleware, adminController.getAllSubscriptions);
router.get('/transcation', adminMiddleware, adminController.getAllTransactions);
router.get('/export/users', adminMiddleware ,adminController.exportUsersToCSV);

router.get('/export/transactions', adminMiddleware, adminController.exportTransactionsToCSV);

module.exports = router;