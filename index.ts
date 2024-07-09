import express, { Express, Request, Response } from "express";
import cors from "cors";
import connectDB from "./src/config/mongoose";
import dotenv from "dotenv";
import groupRoutes from "./src/route/mainRoute";

dotenv.config({ path: './.env' });

const app: Express = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "https://padamthapa.com.np",
  credentials: true,
}));

// Connect to MongoDB
connectDB();

// Setup routes
groupRoutes(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
