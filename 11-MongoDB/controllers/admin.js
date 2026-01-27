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
  req.user
    .createProduct({
      title,
      price,
      imageUrl,
      description,
    })
    .then((result) => {
      console.log("PRODUCT CREATED SUCCESSFULLY");
      res.redirect("/");
    })
    .catch((err) => console.error(err));
};

const getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.error(err));
};

const getEditProduct = (req, res) => {
  // Check if "edit" query parameter is set to true
  const isEditing = req.query.edit;
  const { productId } = req.params;

  if (isEditing == "true") {
    // Fetch the product to pre-populate the form
    Product.findByPk(productId)
      .then((product) => {
        res.render("admin/edit-product", {
          pageTitle: "Add product",
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
  Product.update(
    { title, price, imageUrl, description },
    {
      where: {
        id: productId,
      },
    },
  )
    .then((result) => {
      console.log("UPDATED PRODUCT!");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

const postDeleteProduct = (req, res, next) => {
  const { id } = req.params;
  Product.destroy({
    where: {
      id,
    },
  })
    .then((result) => {
      console.log("DESTROYED PRODUCT");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};
export {
  postAddProduct,
  getAddProducts,
  getProducts,
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
};
