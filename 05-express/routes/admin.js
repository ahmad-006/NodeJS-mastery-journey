import path from "path";

import express from "express";
import { products } from "06-templating/routes/admin.js";
const router = express.Router();

//? add-product route
router.get("/add-product", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../", "views", "add-product.html"));
});

//? implementing /product route
// Using app.post so that it only receives post requests
router.post("/product", (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect("/");
});

export { router };
