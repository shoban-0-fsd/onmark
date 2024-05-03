// orderController.js
const Order = require('../models/order');
const errorHandler = require('../utils/errorHandler');
const responseHandler = require('../utils/responseHandler');

// Create a new order
const createOrder = async (req, res) => {
  // Extract order data from request body
  const { user, products, totalPrice, shippingAddress, paymentMethod } = req.body;

  try {
    // Create a new order instance
    const order = new Order({
      user,
      products,
      totalPrice,
      shippingAddress,
      paymentMethod,
    });

    // Save order to database
    await order.save();

    // Respond with success message
    responseHandler(res, 201, { msg: 'Order created successfully' });
  } catch (err) {
    errorHandler(res, err);
  }
};

// Other controller methods (getOrder, updateOrder, deleteOrder, etc.)

// Get a single order by ID
const getOrder = async (req, res) => {
  try {
    // Find order by ID
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    // Respond with order data
    responseHandler(res, 200, order);
  } catch (err) {
    errorHandler(res, err);
  }
};

// Update an order
const updateOrder = async (req, res) => {
  // Extract order data from request body
  const { user, products, totalPrice, shippingAddress, paymentMethod } = req.body;

  try {
    // Find order by ID and update
    let order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    // Update order fields
    order.user = user || order.user;
    order.products = products || order.products;
    order.totalPrice = totalPrice || order.totalPrice;
    order.shippingAddress = shippingAddress || order.shippingAddress;
    order.paymentMethod = paymentMethod || order.paymentMethod;

    // Save updated order to database
    await order.save();

    // Respond with success message
    responseHandler(res, 200, { msg: 'Order updated successfully' });
  } catch (err) {
    errorHandler(res, err);
  }
};

// Delete an order
const deleteOrder = async (req, res) => {
  try {
    // Find order by ID and delete
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    // Respond with success message
    responseHandler(res, 200, { msg: 'Order deleted successfully' });
  } catch (err) {
    errorHandler(res, err);
  }
};

// Other controller methods (e.g., getOrdersByUser, cancelOrder, etc.)

// Get orders by user
const getOrdersByUser = async (req, res) => {
  try {
    // Find orders by user ID
    const orders = await Order.find({ user: req.params.userId });
    responseHandler(res, 200, orders);
  } catch (err) {
    errorHandler(res, err);
  }
};

// Cancel an order
const cancelOrder = async (req, res) => {
  try {
    // Find order by ID and update status to "cancelled"
    const order = await Order.findByIdAndUpdate(req.params.id, { status: 'cancelled' }, { new: true });
    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    // Respond with updated order
    responseHandler(res, 200, order);
  } catch (err) {
    errorHandler(res, err);
  }
};

// Other controller methods (e.g., getOrderTotal, getOrderStatus, etc.)

// Get order total
const getOrderTotal = async (req, res) => {
  try {
    // Find order by ID and calculate total
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    // Calculate total based on products and prices
    let total = 0;
    order.products.forEach(product => {
      total += product.price * product.quantity;
    });

    // Respond with order total
    responseHandler(res, 200, { total });
  } catch (err) {
    errorHandler(res, err);
  }
};

// Get order status
const getOrderStatus = async (req, res) => {
  try {
    // Find order by ID and get status
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    // Respond with order status
    responseHandler(res, 200, { status: order.status });
  } catch (err) {
    errorHandler(res, err);
  }
};

// Other controller methods (e.g., markOrderAsDelivered, getOrderInvoice, etc.)

// Mark order as delivered
const markOrderAsDelivered = async (req, res) => {
  try {
    // Find order by ID and update status to "delivered"
    const order = await Order.findByIdAndUpdate(req.params.id, { status: 'delivered' }, { new: true });
    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    // Respond with updated order
    responseHandler(res, 200, order);
  } catch (err) {
    errorHandler(res, err);
  }
};

// Get order invoice
const getOrderInvoice = async (req, res) => {
  try {
    // Find order by ID
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    // Generate invoice data (customize based on your requirements)
    const invoice = {
      orderId: order._id,
      user: order.user,
      totalPrice: order.totalPrice,
      products: order.products,
      shippingAddress: order.shippingAddress,
    };

    // Respond with order invoice
    responseHandler(res, 200, invoice);
  } catch (err) {
    errorHandler(res, err);
  }
};

// Other controller methods (e.g., getOrderStatusHistory, getOrderTrackingInfo, etc.)

// Get order status history
const getOrderStatusHistory = async (req, res) => {
  try {
    // Find order by ID
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    // Get status history from order object (assuming it's stored in an array)
    const statusHistory = order.statusHistory || [];

    // Respond with order status history
    responseHandler(res, 200, { statusHistory });
  } catch (err) {
    errorHandler(res, err);
  }
};

// Get order tracking information
const getOrderTrackingInfo = async (req, res) => {
  try {
    // Find order by ID
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    // Get tracking information from order object (assuming it's stored in a separate field)
    const trackingInfo = order.trackingInfo || {};

    // Respond with order tracking information
    responseHandler(res, 200, { trackingInfo });
  } catch (err) {
    errorHandler(res, err);
  }
};

// Other controller methods (e.g., updateOrderStatus, getPaymentStatus, etc.)

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    // Find order by ID and update status
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    // Respond with updated order
    responseHandler(res, 200, order);
  } catch (err) {
    errorHandler(res, err);
  }
};

// Get payment status
const getPaymentStatus = async (req, res) => {
  try {
    // Find order by ID and get payment status
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    // Respond with payment status
    responseHandler(res, 200, { paymentStatus: order.paymentStatus });
  } catch (err) {
    errorHandler(res, err);
  }
};

// Other controller methods (e.g., updateShippingStatus, getOrderDetails, etc.)

// Update shipping status
const updateShippingStatus = async (req, res) => {
  try {
    // Find order by ID and update shipping status
    const { shippingStatus } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { shippingStatus }, { new: true });
    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    // Respond with updated order
    responseHandler(res, 200, order);
  } catch (err) {
    errorHandler(res, err);
  }
};

// Get order details
const getOrderDetails = async (req, res) => {
  try {
    // Find order by ID
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    // Extract relevant order details
    const { user, products, totalPrice, shippingAddress, paymentMethod } = order;

    // Respond with order details
    responseHandler(res, 200, { user, products, totalPrice, shippingAddress, paymentMethod });
  } catch (err) {
    errorHandler(res, err);
  }
};


module.exports = { createOrder,
                   getOrder,
                   updateOrder,
                   deleteOrder,
                   getOrdersByUser,
                   cancelOrder,
                   getOrderTotal,
                   getOrderStatus,
                   getOrderStatusHistory,
                   getOrderTrackingInfo,
                   updateOrderStatus,
                   getPaymentStatus,
                   updateShippingStatus,
                   getOrderDetails };
