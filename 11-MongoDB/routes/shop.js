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
router.get("/cart", getCart);
router.post("/cart", postCart);
router.get("/checkout", getCheckout);
router.get("/orders", getOrders);
router.post("/create-order", postOrders);
router.get("/products", getProducts);
router.get("/products/:productId", getProductId);
router.post("/cart-delete-item", postDeleteCartProduct);
// router.get("/products/delete");

export default router;
