import { Product } from "../models/product.js";

const getAddProducts = (req, res) => {
  res.render("add-product", {
    pageTitle: "Add product",
    path: "/admin/add-product",
  });
};

const postAddProduct = (req, res) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

const getProducts = (req, res) => {
  Product.fetchAll((products) => {
    res.render("shop", { prods: products, pageTitle: "Shop", path: "/" });
  });
};

export { getAddProducts, postAddProduct, getProducts };