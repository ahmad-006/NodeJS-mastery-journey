import { Product } from "../models/product.js";

const getAddProducts = (req, res) => {
  res.render("admin/add-product", {
    pageTitle: "Add product",
    path: "/admin/add-product",
  });
};

const postAddProduct = (req, res) => {
  const { title, price, imageUrl, description } = req.body;
  const product = new Product(title, price, imageUrl, description);
  product.save();
  res.redirect("/");
};

const getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};
export { postAddProduct, getAddProducts, getProducts };
