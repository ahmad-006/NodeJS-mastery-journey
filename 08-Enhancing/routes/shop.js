import express from "express";
import {
  getCart,
  getCheckout,
  getIndex,
  getProducts,
} from "../controllers/shop.js";

const router = express.Router();

//? /  (default) route
router.get("/", getIndex);
router.get("/cart", getCart);
router.get("/checkout", getCheckout);
router.get("/products", getProducts);

export default router;
