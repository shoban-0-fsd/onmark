// userController.js
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const errorHandler = require('../utils/errorHandler');
const responseHandler = require('../utils/responseHandler');

// Register a new user
const registerUser = async (req, res) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Extract user data from request body
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create a new user instance
    user = new User({ name, email, password });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user to database
    await user.save();

    // Generate JWT token
    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Respond with token
    responseHandler(res, 201, { token });
  } catch (err) {
    errorHandler(res, err);
  }
};

// Other controller methods (login, profile update, etc.)

// Login user
const loginUser = async (req, res) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Extract user data from request body
  const { email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Generate JWT token
    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Respond with token
    responseHandler(res, 200, { token });
  } catch (err) {
    errorHandler(res, err);
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Extract user data from request body
  const { name, email, address, phone } = req.body;

  try {
    // Find user by ID and update
    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Update user fields
    user.name = name || user.name;
    user.email = email || user.email;
    user.address = address || user.address;
    user.phone = phone || user.phone;

    // Save updated user to database
    await user.save();

    // Respond with success message
    responseHandler(res, 200, { msg: 'Profile updated successfully' });
  } catch (err) {
    errorHandler(res, err);
  }
};

// Other controller methods (e.g., changePassword, deleteUser, etc.)

// Change user password
const changePassword = async (req, res) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Extract user data from request body
  const { oldPassword, newPassword } = req.body;

  try {
    // Find user by ID
    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Verify old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid old password' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // Save updated user to database
    await user.save();

    // Respond with success message
    responseHandler(res, 200, { msg: 'Password updated successfully' });
  } catch (err) {
    errorHandler(res, err);
  }
};

// Delete user account
const deleteUser = async (req, res) => {
  try {
    // Find user by ID and delete
    const user = await User.findByIdAndDelete(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Respond with success message
    responseHandler(res, 200, { msg: 'User account deleted successfully' });
  } catch (err) {
    errorHandler(res, err);
  }
};

// Other controller methods (e.g., getUser, getUsers, etc.)

// Get single user by ID
const getUser = async (req, res) => {
  try {
    // Find user by ID
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Respond with user data
    responseHandler(res, 200, user);
  } catch (err) {
    errorHandler(res, err);
  }
};

// Get all users
const getUsers = async (req, res) => {
  try {
    // Fetch all users
    const users = await User.find();
    responseHandler(res, 200, users);
  } catch (err) {
    errorHandler(res, err);
  }
};

// Other controller methods (e.g., deactivateUser, activateUser, etc.)

// Activate user account
const activateUser = async (req, res) => {
  try {
    // Find user by ID and update status
    const user = await User.findByIdAndUpdate(req.params.id, { active: true }, { new: true });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Respond with success message
    responseHandler(res, 200, { msg: 'User account activated successfully' });
  } catch (err) {
    errorHandler(res, err);
  }
};

// Deactivate user account
const deactivateUser = async (req, res) => {
  try {
    // Find user by ID and update status
    const user = await User.findByIdAndUpdate(req.params.id, { active: false }, { new: true });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Respond with success message
    responseHandler(res, 200, { msg: 'User account deactivated successfully' });
  } catch (err) {
    errorHandler(res, err);
  }
};

// Delete user account
const deleteUserAccount = async (req, res) => {
  try {
    // Find user by ID and delete
    const user = await User.findByIdAndDelete(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Respond with success message
    responseHandler(res, 200, { msg: 'User account deleted successfully' });
  } catch (err) {
    errorHandler(res, err);
  }
};

module.exports = { registerUser,
                   loginUser,
                   updateUserProfile,
                   changePassword,
                   deleteUser,
                   getUser,
                   getUsers,
                   activateUser,
                   deactivateUser,
                   deleteUserAccount }; 