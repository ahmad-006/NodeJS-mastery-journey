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
  console.log("-------", req.user);
  const product = new Product(
    title,
    price,
    imageUrl,
    description,
    null,
    req.user._id,
  );
  product.save();
  res.redirect("/");
};

const getProducts = (req, res, next) => {
  Product.fetchAll().then((products) => {
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
    Product.findById(productId)
      .then((product) => {
        res.render("admin/edit-product", {
          pageTitle: "Edit product",
          path: "/admin/edit-product",
          product,
          editing: isEditing == "true",
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }
};

const postEditProduct = (req, res, next) => {
  const { productId, price, imageUrl, title, description } = req.body;
  const updatedProduct = { title, price, imageUrl, description };
  Product.updateById(productId, { title, price, imageUrl, description });
  res.redirect("/admin/products");
};

const postDeleteProduct = (req, res, next) => {
  const { id } = req.params;
  Product.deleteById(id).then(() => {
    res.redirect("/admin/products");
  });
};
export {
  postAddProduct,
  getAddProducts,
  getProducts,
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
};
