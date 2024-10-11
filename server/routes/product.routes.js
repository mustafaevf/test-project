const express = require('express');
const productController = require('../controllers/product.controller')

const router = express.Router();

router.get('/products', productController.getProducts);
router.get('/products/:id', productController.getProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);
router.post('/products', productController.createProduct);

module.exports = router;