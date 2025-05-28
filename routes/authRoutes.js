const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authmiddleware = require('../middleware/admin');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/me', authmiddleware , authController.getMe);
router.post('/adminsignup', authController.adminSignup);
router.post('/adminlogin', authController.adminLogin);
router.post('/forget-password', authController.forgotPassword);
router.post('/forget-password/:id', authController.resetPassword);

module.exports = router;