// validationMiddleware.js
const { validationResult, body } = require('express-validator');

const validationMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const validateUserRegistration = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').trim().isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  validationMiddleware
];

const validateUserLogin = [
  body('email').trim().isEmail().withMessage('Invalid email format'),
  body('password').notEmpty().withMessage('Password is required'),
  validationMiddleware
];

const validateUserProfileUpdate = [
  body('name').optional().trim().notEmpty().withMessage('Name is required'),
  body('email').optional().trim().isEmail().withMessage('Invalid email format'),
  body('address').optional().trim().notEmpty().withMessage('Address is required'),
  body('phone').optional().trim().isMobilePhone().withMessage('Invalid phone number'),
  // Add more validation rules for profile update as needed
  validationMiddleware
];

const validatePasswordChange = [
  body('oldPassword').notEmpty().withMessage('Old password is required'),
  body('newPassword').isLength({ min: 8 }).withMessage('New password must be at least 8 characters long'),
  // Add more validation rules for password change as needed
  validationMiddleware
];

const validateProductCreation = [
  body('name').trim().notEmpty().withMessage('Product name is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  // Add more validation rules for product creation as needed
  validationMiddleware
];

const validateProductUpdate = [
  body('name').optional().trim().notEmpty().withMessage('Product name is required'),
  body('price').optional().isNumeric().withMessage('Price must be a number'),
  // Add more validation rules for product update as needed
  validationMiddleware
];

const validateOrderCreation = [
  body('user').trim().notEmpty().withMessage('User is required'),
  body('products').isArray({ min: 1 }).withMessage('At least one product is required'),
  body('totalPrice').isNumeric().withMessage('Total price must be a number'),
  body('shippingAddress').trim().notEmpty().withMessage('Shipping address is required'),
  body('paymentMethod').trim().notEmpty().withMessage('Payment method is required'),
  // Add more validation rules for order creation as needed
  validationMiddleware
];

const validateOrderUpdate = [
  body('user').optional().trim().notEmpty().withMessage('User is required'),
  body('products').optional().isArray({ min: 1 }).withMessage('At least one product is required'),
  body('totalPrice').optional().isNumeric().withMessage('Total price must be a number'),
  body('shippingAddress').optional().trim().notEmpty().withMessage('Shipping address is required'),
  body('paymentMethod').optional().trim().notEmpty().withMessage('Payment method is required'),
  // Add more validation rules for order update as needed
  validationMiddleware
];



module.exports = {
  validationMiddleware,
  validateUserRegistration,
  validateUserLogin,
  validateUserProfileUpdate,
  validatePasswordChange,
  validateProductCreation,
  validateProductUpdate,
  validateOrderCreation,
  validateOrderUpdate
};
