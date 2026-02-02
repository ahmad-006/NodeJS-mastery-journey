import express from "express";
import {
  getAddProducts,
  getEditProduct,
  getProducts,
  postAddProduct,
  postDeleteProduct,
  postEditProduct,
} from "../controllers/admin.js";
const router = express.Router();

const products = [];
router.get("/add-product", getAddProducts);
router.get("/products", getProducts);
router.post("/add-product", postAddProduct);
router.get("/edit-product/:productId", getEditProduct);
router.post("/edit-product", postEditProduct);
router.post("/delete-product/:id", postDeleteProduct);

export { router };
