// userRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, updateUserProfile, changePassword, deleteUserAccount } = require('../controllers/userController');
const { validateUserRegistration, validateUserLogin, validateUserProfileUpdate, validatePasswordChange } = require('../middleware/validationMiddleware');
const { authenticateUser } = require('../middleware/authMiddleware');

// Register a new user
router.post('/register', validateUserRegistration, registerUser);

// Other user routes (login, profile update, etc.) with authentication middleware

// User login
router.post('/login', validateUserLogin, loginUser);

// Update user profile
router.put('/profile', authenticateUser, validateUserProfileUpdate, updateUserProfile);

// Other user routes (change password, delete account, etc.) with authentication middleware

// Change password
router.put('/password', authenticateUser, validatePasswordChange, changePassword);

// Delete user account
router.delete('/account', authenticateUser, deleteUserAccount);


module.exports = router;
