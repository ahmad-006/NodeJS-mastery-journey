import express from "express";
import { getAddProducts, postAddProduct } from "../controllers/products.js";
const router = express.Router();

const products = [];
//? add-product route
router.get("/add-product", getAddProducts);

//? implementing /product route
// Using app.post so that it only receives post requests
router.post("/product", postAddProduct);

export { router };
