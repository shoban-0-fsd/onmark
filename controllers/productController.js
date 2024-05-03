const Product = require('../models/product');
const errorHandler = require('../utils/errorHandler');
const responseHandler = require('../utils/responseHandler');

// Create a new product
const createProduct = async (req, res) => {
  // Extract product data from request body
  const { name, description, price, quantityAvailable, category } = req.body;

  try {
    // Create a new product instance
    const product = new Product({
      name,
      description,
      price,
      quantityAvailable,
      category,
    });

    // Save product to database
    await product.save();

    // Respond with success message
    responseHandler(res, 201, { msg: 'Product created successfully' });
  } catch (err) {
    errorHandler(res, err);
  }
};

// Other controller methods (getProduct, updateProduct, deleteProduct, etc.)

// Get a single product by ID
const getProduct = async (req, res) => {
  try {
    // Find product by ID
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    // Respond with product data
    responseHandler(res, 200, product);
  } catch (err) {
    errorHandler(res, err);
  }
};

// Update a product
const updateProduct = async (req, res) => {
  // Extract product data from request body
  const { name, description, price, quantityAvailable, category } = req.body;

  try {
    // Find product by ID and update
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    // Update product fields
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.quantityAvailable = quantityAvailable || product.quantityAvailable;
    product.category = category || product.category;

    // Save updated product to database
    await product.save();

    // Respond with success message
    responseHandler(res, 200, { msg: 'Product updated successfully' });
  } catch (err) {
    errorHandler(res, err);
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    // Find product by ID and delete
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    // Respond with success message
    responseHandler(res, 200, { msg: 'Product deleted successfully' });
  } catch (err) {
    errorHandler(res, err);
  }
};

// Other controller methods (e.g., getProducts, searchProducts, etc.)

// Get all products
const getProducts = async (req, res) => {
  try {
    // Fetch all products
    const products = await Product.find();
    responseHandler(res, 200, products);
  } catch (err) {
    errorHandler(res, err);
  }
};

// Search products
const searchProducts = async (req, res) => {
  const { keyword } = req.query;
  try {
    // Search for products by keyword
    const products = await Product.find({
      $or: [
        { name: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
      ],
    });
    responseHandler(res, 200, products);
  } catch (err) {
    errorHandler(res, err);
  }
};

// Other controller methods (e.g., getProductReviews, getProductCategories, etc.)

// Get product reviews
const getProductReviews = async (req, res) => {
  try {
    // Find product by ID and populate reviews
    const product = await Product.findById(req.params.id).populate('reviews');
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    // Respond with product reviews
    responseHandler(res, 200, product.reviews);
  } catch (err) {
    errorHandler(res, err);
  }
};

// Get product categories
const getProductCategories = async (req, res) => {
  try {
    // Fetch all distinct categories from products
    const categories = await Product.distinct('category');
    responseHandler(res, 200, categories);
  } catch (err) {
    errorHandler(res, err);
  }
};

// Other controller methods (e.g., getProductAttributes, getProductRecommendations, etc.)

// Get product attributes
const getProductAttributes = async (req, res) => {
  try {
    // Find product by ID and select attributes
    const product = await Product.findById(req.params.id).select('attributes');
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    // Respond with product attributes
    responseHandler(res, 200, product.attributes);
  } catch (err) {
    errorHandler(res, err);
  }
};

// Get product recommendations
const getProductRecommendations = async (req, res) => {
  try {
    // Fetch product recommendations based on certain criteria
    const recommendations = await Product.find({ category: req.params.category }).limit(5);
    responseHandler(res, 200, recommendations);
  } catch (err) {
    errorHandler(res, err);
  }
};

// Other controller methods (e.g., getProductVariations, getProductRelated, etc.)

// Get product variations
const getProductVariations = async (req, res) => {
  try {
    // Find product by ID and populate variations
    const product = await Product.findById(req.params.id).populate('variations');
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    // Respond with product variations
    responseHandler(res, 200, product.variations);
  } catch (err) {
    errorHandler(res, err);
  }
};

// Get related products
const getProductRelated = async (req, res) => {
  try {
    // Fetch related products based on certain criteria
    const relatedProducts = await Product.find({ category: req.params.category }).limit(5);
    responseHandler(res, 200, relatedProducts);
  } catch (err) {
    errorHandler(res, err);
  }
};

// Other controller methods (e.g., getProductSimilar, getProductFeatured, etc.)

// Get product similar to a given product
const getProductSimilar = async (req, res) => {
  try {
    // Find the current product
    const currentProduct = await Product.findById(req.params.id);
    if (!currentProduct) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    // Fetch similar products based on certain criteria (e.g., category or attributes)
    const similarProducts = await Product.find({
      category: currentProduct.category,
      _id: { $ne: currentProduct._id }, // Exclude the current product
    }).limit(5);

    // Respond with similar products
    responseHandler(res, 200, similarProducts);
  } catch (err) {
    errorHandler(res, err);
  }
};

// Get featured products
const getProductFeatured = async (req, res) => {
  try {
    // Fetch featured products based on certain criteria (e.g., popularity or ratings)
    const featuredProducts = await Product.find({ featured: true }).limit(5);

    // Respond with featured products
    responseHandler(res, 200, featuredProducts);
  } catch (err) {
    errorHandler(res, err);
  }
};

// Other controller methods (e.g., getProductBestSellers, getProductDiscounted, etc.)

// Get best-selling products
const getProductBestSellers = async (req, res) => {
  try {
    // Fetch best-selling products based on certain criteria (e.g., sales volume)
    const bestSellers = await Product.find().sort({ salesVolume: -1 }).limit(5);

    // Respond with best-selling products
    responseHandler(res, 200, bestSellers);
  } catch (err) {
    errorHandler(res, err);
  }
};

// Get discounted products
const getProductDiscounted = async (req, res) => {
  try {
    // Fetch discounted products based on certain criteria (e.g., discount percentage)
    const discountedProducts = await Product.find({ discountPercentage: { $gt: 0 } }).limit(5);

    // Respond with discounted products
    responseHandler(res, 200, discountedProducts);
  } catch (err) {
    errorHandler(res, err);
  }
};

// Other controller methods (e.g., getProductNewArrivals, getProductFeaturedDeals, etc.)

// Get new arrivals
const getProductNewArrivals = async (req, res) => {
  try {
    // Fetch new arrivals based on certain criteria (e.g., release date)
    const newArrivals = await Product.find({ releaseDate: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } }).limit(5);

    // Respond with new arrivals
    responseHandler(res, 200, newArrivals);
  } catch (err) {
    errorHandler(res, err);
  }
};

// Get featured deals
const getProductFeaturedDeals = async (req, res) => {
  try {
    // Fetch featured deals based on certain criteria (e.g., discounted price and high ratings)
    const featuredDeals = await Product.find({ discountPercentage: { $gt: 0 }, averageRating: { $gte: 4.5 } }).limit(5);

    // Respond with featured deals
    responseHandler(res, 200, featuredDeals);
  } catch (err) {
    errorHandler(res, err);
  }
};

// Other controller methods (e.g., getProductPopularItems, getProductTopRated, etc.)

// Get popular items
const getProductPopularItems = async (req, res) => {
  try {
    // Fetch popular items based on certain criteria (e.g., sales volume)
    const popularItems = await Product.find().sort({ salesVolume: -1 }).limit(5);

    // Respond with popular items
    responseHandler(res, 200, popularItems);
  } catch (err) {
    errorHandler(res, err);
  }
};

// Get top-rated products
const getProductTopRated = async (req, res) => {
  try {
    // Fetch top-rated products based on certain criteria (e.g., average rating)
    const topRatedProducts = await Product.find({ averageRating: { $gte: 4.5 } }).limit(5);

    // Respond with top-rated products
    responseHandler(res, 200, topRatedProducts);
  } catch (err) {
    errorHandler(res, err);
  }
};

// Other controller methods (e.g., getProductTrending, getProductRecommended, etc.)

// Get trending products
const getProductTrending = async (req, res) => {
  try {
    // Fetch trending products based on certain criteria (e.g., recent sales or views)
    const trendingProducts = await Product.find().sort({ salesVolume: -1 }).limit(5);

    // Respond with trending products
    responseHandler(res, 200, trendingProducts);
  } catch (err) {
    errorHandler(res, err);
  }
};

// Get recommended products
const getProductRecommended = async (req, res) => {
  try {
    // Fetch recommended products based on certain criteria (e.g., user preferences or collaborative filtering)
    const recommendedProducts = await Product.find().limit(5);

    // Respond with recommended products
    responseHandler(res, 200, recommendedProducts);
  } catch (err) {
    errorHandler(res, err);
  }
};

// Other controller methods (e.g., getProductRelatedDeals, getProductLatestItems, etc.)

// Get related deals
const getProductRelatedDeals = async (req, res) => {
  try {
    // Fetch related deals based on certain criteria (e.g., same category and discounted)
    const relatedDeals = await Product.find({ category: req.params.category, discountPercentage: { $gt: 0 } }).limit(5);

    // Respond with related deals
    responseHandler(res, 200, relatedDeals);
  } catch (err) {
    errorHandler(res, err);
  }
};

// Get latest items
const getProductLatestItems = async (req, res) => {
  try {
    // Fetch latest items based on certain criteria (e.g., release date)
    const latestItems = await Product.find().sort({ releaseDate: -1 }).limit(5);

    // Respond with latest items
    responseHandler(res, 200, latestItems);
  } catch (err) {
    errorHandler(res, err);
  }
};

module.exports = { createProduct,
                   getProduct,
                   updateProduct,
                   deleteProduct,
                   getProducts,
                   searchProducts,
                   getProductReviews,
                   getProductCategories,
                   getProductAttributes,
                   getProductRecommendations,
                   getProductVariations,
                   getProductRelated,
                   getProductSimilar,
                   getProductFeatured,
                   getProductBestSellers,
                   getProductDiscounted,
                   getProductNewArrivals,
                   getProductFeaturedDeals,
                   getProductPopularItems,
                   getProductTopRated,
                   getProductTrending,
                   getProductRecommended,
                   getProductRelatedDeals,
                   getProductLatestItems };
