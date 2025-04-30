import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import userRoute from "./routes/user.route.js";
import productRoute from "./routes/product.route.js";
import cartRoute from "./routes/cart.route.js";

dotenv.config();

const app = express();

// Middleware to parse data
app.use(express.json());

// Routes
app.use("/api/user/v1", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/cart", cartRoute);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  connectDB();
});
