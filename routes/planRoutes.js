const express = require('express');
const router = express.Router();
const authmiddelware = require('../middleware/auth');
const planController = require('../controllers/planController');

router.post('/', authmiddelware, planController.createPlan);
router.get('/:productId', authmiddelware, planController.getPlanByProduct);

module.exports = router;
