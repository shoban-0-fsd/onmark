const express = require('express');
const router = express.Router();
const { createProduct, getProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { validateProductCreation, validateProductUpdate } = require('../middleware/validationMiddleware');
const { authenticateAdmin } = require('../middleware/authMiddleware');

// Create a new product
router.post('/', authenticateAdmin, validateProductCreation, createProduct);

// Get a product by ID
router.get('/:productId', getProduct);

// Update a product by ID
router.put('/:productId', authenticateAdmin, validateProductUpdate, updateProduct);

// Delete a product by ID
router.delete('/:productId', authenticateAdmin, deleteProduct);

module.exports = router;
