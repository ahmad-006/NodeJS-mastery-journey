import express from "express";
import {
  getCart,
  getCheckout,
  getIndex,
  getOrders,
  getProductId,
  getProducts,
  postCart,
} from "../controllers/shop.js";

const router = express.Router();

//? /  (default) route
router.get("/", getIndex);
router.get("/cart", getCart);
router.post("/cart", postCart);
router.get("/checkout", getCheckout);
router.get("/orders", getOrders);
router.get("/products", getProducts);
router.get("/products/:productId", getProductId);
// router.get("/products/delete");

export default router;
