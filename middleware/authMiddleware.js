// authMiddleware.js
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const authMiddleware = (req, res, next) => {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if token exists
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, config.jwtSecret);

    // Set user from token payload
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

const authenticateUser = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ msg: 'Unauthorized access' });
  }
  // Check if user is authenticated (You can add more conditions as per your requirements)
  next();
};

const authenticateAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(401).json({ msg: 'Unauthorized access' });
  }
  // Check if user is an admin
  next();
};

module.exports = { authMiddleware, authenticateUser, authenticateAdmin };
