import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register new user
export const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // If any field is missing
    if (!fullName || !email || !password) {
      return res.status(404).json({
        message: "All fields are required",
        success: false,
      });
    }

    // Find and return document by email
    const user = await User.findOne({ email });

    // If user already exist
    if (user) {
      return res.status(409).json({
        message: "Account already exist with this email",
        success: false,
      });
    }

    // Password hashing
    const hashPassword = await bcrypt.hash(password, 10);

    // Creating and saving document
    await User.create({
      fullName,
      email,
      password: hashPassword,
    });

    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // If fields are empty
    if (!email || !password) {
      return res.status(404).json({
        message: "All fields are required",
        success: false,
      });
    }

    const user = await User.findOne({ email });

    // If user doesn't exist
    if (!user) return res.status(401).json({ message: "Incorrect email" });

    // Comparing password, will return boolean value
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    // If password doesn't match
    if (!isPasswordMatch)
      return res.status(401).json({ message: "Incorrect password" });

    // Payload
    const tokenData = {
      userId: user._id,
    };

    // Sign jwt token (token creation)
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Sending to token to client
    return res.status(200).json({
      message: `Welcome back, ${user.fullName}`,
      token,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
