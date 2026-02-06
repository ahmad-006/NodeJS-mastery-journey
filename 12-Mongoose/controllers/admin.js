import { Product } from "../models/product.js";

const getProducts = async (req, res, next) => {
  const products = await Product.find();
  res.render("admin/products", {
    prods: products,
    pageTitle: "Admin Products",
    path: "/admin/products",
  });
};

const postAddProduct = async (req, res) => {
  const { _id: userId } = req.user;
  const { title, price, imageUrl, description } = req.body;
  const product = new Product({ title, price, imageUrl, description, userId });
  await product.save();
  res.redirect("/");
};

const getEditProduct = async (req, res) => {
  // Check if "edit" query parameter is set to true
  const isEditing = req.query.edit;
  const { productId } = req.params;

  if (isEditing == "true") {
    // Fetch the product to pre-populate the form
    const product = Product.findById(productId);

    res.render("admin/edit-product", {
      pageTitle: "Edit product",
      path: "/admin/edit-product",
      product,
      editing: isEditing == "true",
    });
  }
};

const getAddProducts = async (req, res) => {
  res.render("admin/edit-product", {
    pageTitle: "Add product",
    path: "/admin/add-product",
    editing: false,
  });
};

const postEditProduct = async (req, res, next) => {
  const { productId, price, imageUrl, title, description } = req.body;
  const updatedProduct = { title, price, imageUrl, description };
  await Product.updateOne({ _id: productId }, updatedProduct);
  res.redirect("/admin/products");
};

const postDeleteProduct = async (req, res, next) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id).then(() => {
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
