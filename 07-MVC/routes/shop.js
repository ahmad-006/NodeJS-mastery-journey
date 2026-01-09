import express from "express";
import { getProducts } from "../controllers/products.js";

const router = express.Router();

//? /  (default) route
router.get("/", getProducts);

export default router;
