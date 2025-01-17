import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(
	cors({
		origin: process.env.CLIENT_URL || "*",
		credentials: true,
	})
);

app.use("/api/products", productRoutes);

app.listen(PORT, async () => {
	try {
		await connectDB();
		console.log(`Server running on port ${PORT}`);
	} catch (error) {
		console.error("Database connection failed:", error.message);
	}
});
