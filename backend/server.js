import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// CORS Configuration
app.use(
	cors({
		origin: process.env.CLIENT_URL || "*",
		credentials: true,
	})
);

// Routes
app.use("/api/products", productRoutes);

// Server Start
app.listen(PORT, async () => {
	try {
		await connectDB();
		console.log(`Server running on port ${PORT}`);
	} catch (error) {
		console.error("Database connection failed:", error.message);
	}
});
