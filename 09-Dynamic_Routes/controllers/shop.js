import { Product } from "../models/product.js";

const getIndex = (req, res) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};

const getProducts = (req, res) => {
  Product.fetchAll((products) => {
    res.render("shop/products-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  });
};
const getCart = (req, res) => {
  res.render("shop/cart", {
    path: "/cart",
    pageTitle: "Your Cart",
  });
};
const getCheckout = (req, res) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
const getOrders = (req, res) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

const getProductId = (req, res, next) => {
  const { productId } = req.params;
  Product.FindById(productId, (product) => {
    console.log(product);
  });
  res.redirect("/");
};
export { getProducts, getIndex, getCart, getCheckout, getOrders, getProductId };
