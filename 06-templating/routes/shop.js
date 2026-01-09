import path from "path";

import express from "express";
import { products } from "./admin.js";

const router = express.Router();

//? /  (default) route
router.get("/", (req, res, next) => {
  res.render("shop", { prods: products, pageTitle: "Shop" });
});

export default router;
