import express from "express";
import { register, login } from "../controllers/user.controller.js";

const router = express.Router();

// route to register a new user
router.route("/register").post(register);

// route to login a user and return jwt token
router.route("/login").post(login);

export default router;
