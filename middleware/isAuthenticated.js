import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
  // headers from frontend
  const authHeader = req.headers.authorization;

  // Check if Authorization header is present and starts with "Bearer"
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized, no token provided" });
  }

  // Extract token from the Authorization header
  const token = authHeader.split(" ")[1];

  try {
    // Verify token using secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Store user ID in the request object
    req.userId = decoded.userId;

    // Move to the next middleware or route handler
    next();
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Token verification failed:", error);

    // Return Unauthorized if verification fails
    return res
      .status(401)
      .json({ message: "Unauthorized, invalid token", success: false });
  }
};
