import express from "express";
import { getProducts } from "../../07- MVC/controllers/products.js";

const router = express.Router();

//? /  (default) route
router.get("/", getProducts);

export default router;
