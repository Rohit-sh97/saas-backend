const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authmiddleware = require('../middleware/auth');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/adminsignup', authController.adminSignup);
router.post('/adminlogin', authController.adminLogin);
router.post('/forget-password', authController.forgetPassword);
router.get('/me', authmiddleware , authController.getMe);

module.exports = router;