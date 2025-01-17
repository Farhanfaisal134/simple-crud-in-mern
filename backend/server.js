import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import productRoutes from "./routes/product.route.js";
import mongoose from "mongoose";
dotenv.config();

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log("Connected to mongoDB")
	})
	.catch((err) => {
		console.log(err)
	})

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
	cors({
		origin: process.env.CLIENT_URL || "*",
		credentials: true,
	})
);

app.get("/", (req, res) => {
	res.send("Hello World");
});

app.use("/api/products", productRoutes);

app.listen(PORT, async () => {
	try {
		console.log(`Server running on port ${PORT}`);
	} catch (error) {
		console.error("Database connection failed:", error.message);
	}
});
