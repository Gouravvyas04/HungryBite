import express from "express";
import { addToCart, removeFromCart, getCart } from "../controllers/cartController.js";
import authMiddleware from "../middleware/auth.js";

const cartRouter = express.Router();

// Add to cart
cartRouter.post("/add", authMiddleware, addToCart);

// Remove from cart (Fixed typo from `/remov` to `/remove`)
cartRouter.post("/remove", authMiddleware, removeFromCart);

// Get cart data (Changed from `POST` to `GET`)
cartRouter.post("/get", authMiddleware, getCart);

export default cartRouter;
