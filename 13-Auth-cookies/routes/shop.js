import express from "express";
import {
  getCart,
  getCheckout,
  getIndex,
  getOrders,
  getProductId,
  getProducts,
  postCart,
  postDeleteCartProduct,
  postOrders,
} from "../controllers/shop.js";

const router = express.Router();

//? /  (default) route
router.get("/", getIndex);
router.get("/products", getProducts);
router.get("/products/:productId", getProductId);
router.get("/cart", getCart);
router.post("/cart", postCart);
router.get("/orders", getOrders);
router.get("/checkout", getCheckout);
router.post("/create-order", postOrders);
router.post("/cart-delete-item", postDeleteCartProduct);

export default router;
