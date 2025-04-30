import Product from "../models/product.model.js";

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json({
      message: "Get all product successfully",
      products,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

// Get product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    // If product doesn't exist
    if (!product)
      return res
        .status(404)
        .json({ message: "Product not found", success: false });

    return res.status(200).json({
      message: `Get product by id ${product._id}`,
      product,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

//Create Product:
export const createProduct = async (req, res) => {
  try {
    const { name, price, description, stockQuantity } = req.body;

    if (!name || !price || !description || !stockQuantity) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    // Creating a new document
    const newProduct = new Product({
      name,
      price,
      description,
      stockQuantity,
    });

    // Saving document
    const createdProduct = await newProduct.save();

    return res.status(201).json({
      message: "Successfully saved document",
      success: true,
      createdProduct,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error creating product", success: false });
  }
};

// Update the product:
export const updateProduct = async (req, res) => {
  const { name, price, description, stockQuantity } = req.body;

  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Updating document
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.stockQuantity = stockQuantity || product.stockQuantity;

    // Saving document
    const updatedProduct = await product.save();

    return res.status(200).json({
      message: "Update document successfully",
      updatedProduct,
      success: true,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error updating product", success: false });
  }
};

// Delete product by ID
export const deleteProductById = async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete the product by ID
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct)
      return res
        .status(404)
        .json({ message: "Product not found", success: false, deletedProduct });

    return res
      .status(200)
      .json({ message: "Product deleted successfully", success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};
