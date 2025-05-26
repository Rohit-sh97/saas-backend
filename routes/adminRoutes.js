const express = require('express');
const router = express.Router();
const  AuthMiddelware  = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');
const adminController = require('../controllers/adminController');


router.get('/users', AuthMiddelware, adminMiddleware, adminController.getAllUsers);
router.get('/user/:id', AuthMiddelware, adminController.getUserDetails);
router.put('/user/:id/ban', AuthMiddelware, adminMiddleware, adminController.banOrUnbanUser);
router.get('/subscriptions', AuthMiddelware, adminController.getAllSubscriptions);
router.get('/transcation', AuthMiddelware, adminController.getAllTransactions);
router.get('/export/users', AuthMiddelware, adminController.exportUsersToCSV);

router.get('/export/transactions', AuthMiddelware, adminController.exportTransactionsToCSV);

module.exports = router;