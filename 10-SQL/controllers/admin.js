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
  // Check if "edit" query parameter is set to true
  const isEditing = req.query.edit;
  const { productId } = req.params;
  
  if (isEditing == "true") {
    // Fetch the product to pre-populate the form
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
  // Extract updated product info from request body
  const { productId, price, imageUrl, title, description } = req.body;
  
  // Create a new Product instance with the existing ID
  const product = new Product(productId, title, price, imageUrl, description);
  
  // Save changes (will trigger update logic in model)
  product.save(() => {
    res.redirect("/");
  });
};

const postDeleteProduct = (req, res, next) => {
  const { id } = req.params;
  // Delete the product by ID
  Product.delete(id);
  res.redirect("/admin/products");
};
export {
  postAddProduct,
  getAddProducts,
  getProducts,
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
};