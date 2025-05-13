import express from "express";
import {
  addToCart,
  updateCart,
  removeFromCart,
} from "../controllers/cart.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();

// Route to add a product to the cart (protected route)
router.post("/", isAuthenticated, addToCart);

// Route to update the quantity of a product in the cart (protected route)
router.put("/:id", isAuthenticated, updateCart);

// Route to remove a product from the cart (protected route)
router.delete("/:id", isAuthenticated, removeFromCart);

export default router;
