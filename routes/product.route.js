import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProductById,
} from "../controllers/product.controller.js";

const router = express.Router();

// Route to get all products
router.get("/", getProducts);

// Route to get a single product by ID
router.get("/:id", getProductById);

// Route to create a new product (Create)
router.post("/", createProduct);

// Route to update a product by ID (Update)
router.put("/:id", updateProduct);

// Route to delete a product by ID (Delete)
router.delete("/:id", deleteProductById);

export default router;
