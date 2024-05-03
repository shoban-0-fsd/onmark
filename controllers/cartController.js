const Cart = require('../models/cart');

// Add a product to the cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id; // Assuming user is authenticated and user ID is available in the request

    // Check if the product is already in the cart
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      // Create a new cart if it doesn't exist for the user
      cart = new Cart({ user: userId, products: [{ product: productId, quantity }] });
    } else {
      // Update quantity if product already exists in the cart
      const existingProductIndex = cart.products.findIndex(item => item.product.toString() === productId);
      if (existingProductIndex !== -1) {
        cart.products[existingProductIndex].quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }
    }

    // Save or update cart in the database
    await cart.save();

    res.status(200).json({ msg: 'Product added to cart successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update quantity of a product in the cart
const updateCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id; // Assuming user is authenticated and user ID is available in the request

    // Find the user's cart
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    // Update quantity of the specified product in the cart
    const productIndex = cart.products.findIndex(item => item.product.toString() === productId);
    if (productIndex !== -1) {
      cart.products[productIndex].quantity = quantity;
      await cart.save();
      res.status(200).json({ msg: 'Cart updated successfully' });
    } else {
      res.status(404).json({ error: 'Product not found in cart' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Remove a product from the cart
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id; // Assuming user is authenticated and user ID is available in the request

    // Find the user's cart
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    // Remove the specified product from the cart
    cart.products = cart.products.filter(item => item.product.toString() !== productId);
    await cart.save();

    res.status(200).json({ msg: 'Product removed from cart successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { addToCart, updateCart, removeFromCart };
