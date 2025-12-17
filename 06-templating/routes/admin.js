import path from "path";

import express from "express";
const router = express.Router();

const products = [];
//? add-product route
router.get("/add-product", (req, res) => {
  res.render("add-product", { pageTitle: "Add product" });
});

//? implementing /product route
// Using app.post so that it only receives post requests
router.post("/product", (req, res) => {
  products.push({ title: req.body.title });
  res.redirect("/");
});

export { router, products };
