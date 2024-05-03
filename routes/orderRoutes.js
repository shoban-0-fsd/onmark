// orderRoutes.js
const express = require('express');
const router = express.Router();
const { createOrder, getOrder, updateOrder, deleteOrder } = require('../controllers/orderController');
const { validateOrderCreation, validateOrderUpdate } = require('../middleware/validationMiddleware');
const { authenticateUser } = require('../middleware/authMiddleware');

// Create a new order
router.post('/', authenticateUser, validateOrderCreation, createOrder);

// Get an order by ID
router.get('/:orderId', authenticateUser, getOrder);

// Update an order by ID
router.put('/:orderId', authenticateUser, validateOrderUpdate, updateOrder);

// Delete an order by ID
router.delete('/:orderId', authenticateUser, deleteOrder);

module.exports = router;
