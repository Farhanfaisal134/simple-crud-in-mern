import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

if (process.env.NODE_ENV !== "production") {
	dotenv.config({
		path: "./config/.env",
	});
};

const corsConfig = {
	origin: process.env.Client_URL,
	credentials: true,
	method: ["GET", "POST", "PUT", "DELETE"],
};

app.options("", cors(corsConfig));
app.use(cors(corsConfig));

app.get("/", (req, res) => {
	res.send("Hello World");
});

app.use("/api/products", productRoutes);

app.listen(PORT, async () => {
	try {
		await connectDB();
		console.log(`Server running on port ${PORT}`);
	} catch (error) {
		console.error("Database connection failed:", error.message);
	}
});
