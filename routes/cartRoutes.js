const express = require('express');
const router = express.Router();
const { addToCart, updateCart, removeFromCart } = require('../controllers/cartController');
const { authenticateUser } = require('../middleware/authMiddleware');

// Add a product to the cart
router.post('/add', authenticateUser, addToCart);

// Update quantity of a product in the cart
router.put('/update', authenticateUser, updateCart);

// Remove a product from the cart
router.delete('/remove', authenticateUser, removeFromCart);

module.exports = router;
