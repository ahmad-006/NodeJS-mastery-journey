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
//? add-product route
router.get("/add-product", getAddProducts);

//? edit-product route
router.get("/products", getProducts);

//? implementing /product route
router.post("/add-product", postAddProduct);

router.get("/edit-product/:productId", getEditProduct);
router.post("/edit-product", postEditProduct);

router.post("/delete-product/:id", postDeleteProduct);

export { router };
