const express = require('express');
const productRoutes = require('./product.routes');
const userRoutes = require('./user.routes');

const router = express.Router();

router.use('/', productRoutes);
router.use('/', userRoutes);

module.exports = router;