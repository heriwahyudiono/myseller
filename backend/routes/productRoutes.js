const express = require('express');
const productController = require('../controllers/productController');
const authenticationMiddleware = require('../middleware/authenticationMiddleware');

const router = express.Router();

router.post(
  '/add',
  authenticationMiddleware.authenticateToken,
  productController.addProduct
);

module.exports = router;