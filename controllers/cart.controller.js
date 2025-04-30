import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

// Add a product to the cart
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Validation checks
    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({
        message: "Product ID and a valid quantity are required",
        success: false,
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found", success: false });
    }

    // Check if product is already in the cart
    const existingCartItem = await Cart.findOne({
      productId,
      userId: req.userId,
    });
    if (existingCartItem) {
      return res
        .status(400)
        .json({ message: "Product already in cart", success: false });
    }

    // create a document
    const cartItem = new Cart({
      productId,
      quantity,
      userId: req.userId, // Coming from middleware
    });

    // save a document
    await cartItem.save();
    return res.status(201).json({
      message: "Get product successfully",
      cartItem,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

// Update quantity in the cart
export const updateCart = async (req, res) => {
  try {
    const { quantity } = req.body;

    // Validate quantity
    if (!quantity || quantity <= 0) {
      return res
        .status(400)
        .json({ message: "A valid quantity is required", success: false });
    }

    const cartItem = await Cart.findById(req.params.id);
    if (!cartItem) {
      return res
        .status(404)
        .json({ message: "Cart item not found", success: false });
    }

    // Update quantity
    cartItem.quantity = quantity;

    // save document
    await cartItem.save();
    return res.status(200).json({
      message: "Update successfully",
      success: true,
      cartItem,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove product from the cart
export const removeFromCart = async (req, res) => {
  try {
    const cartItem = await Cart.findByIdAndDelete(req.params.id);
    if (!cartItem) {
      return res
        .status(404)
        .json({ message: "Cart item not found", success: false });
    }
    return res
      .status(200)
      .json({ message: "Item removed from cart", success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};
