const express = require('express');
const router = express.Router();
const authmiddelware = require('../middleware/auth');
const productController = require('../controllers/productController');

router.post('/', authmiddelware, productController.createProduct);
router.get('/getall', authmiddelware, productController.getAllProducts);
router.get('/:id', authmiddelware, productController.getProductById);
router.put('/:id', authmiddelware, productController.updateProduct);
router.delete('/:id', authmiddelware, productController.deleteProduct);

module.exports = router;