import { Product } from "../models/product.js";

const getAddProducts = (req, res) => {
  res.render("admin/edit-product", {
    pageTitle: "Add product",
    path: "/admin/add-product",
    editing: false,
  });
};

const postAddProduct = (req, res) => {
  const { title, price, imageUrl, description } = req.body;
  const product = new Product(null, title, price, imageUrl, description);
  product.save(() => {
    res.redirect("/");
  });
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

const getEditProduct = (req, res) => {
  const isEditing = req.query.edit;
  const { productId } = req.params;
  if (isEditing == "true") {
    Product.FindById(productId, (product) => {
      res.render("admin/edit-product", {
        pageTitle: "Add product",
        path: "/admin/edit-product",
        product,
        editing: isEditing == "true",
      });
    });
  }
};

const postEditProduct = (req, res, next) => {
  const { id, price, imageUrl, title, description } = req.body;
  const product = new Product(id, title, price, imageUrl, description);
  product.save(() => {
    res.redirect("/");
  });
};
export {
  postAddProduct,
  getAddProducts,
  getProducts,
  getEditProduct,
  postEditProduct,
};
