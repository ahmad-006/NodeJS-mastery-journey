import express from "express";
import {
  getAddProducts,
  getProducts,
  postAddProduct,
} from "../controllers/admin.js";
const router = express.Router();

const products = [];
//? add-product route
router.get("/add-product", getAddProducts);

//? edit-product route
router.get("/products", getProducts);

//? implementing /product route
router.post("/add-product", postAddProduct);

export { router };
