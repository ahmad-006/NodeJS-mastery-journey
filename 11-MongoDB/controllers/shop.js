import { Product } from "../models/product.js";

const getIndex = (req, res) => {
  Product.fetchAll().then((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};

const getProducts = (req, res) => {
  Product.fetchAll().then((products) => {
    res.render("shop/products-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  });
};

const getProductId = (req, res, next) => {
  const { productId } = req.params;
  Product.findById(productId)
    .then((product) => {
      res.render("shop/product-detail", {
        pageTitle: product.title,
        product: product,
        path: "/products",
      });
    })
    .catch((err) => console.log(err.sqlMessage));
};

const getCart = (req, res) => {
  req.user
    .getCart()
    .then((products) => {
      let totalPrice = 0;
      products.forEach((p) => {
        totalPrice += p.price * p.quantity;
      });
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: products,
        totalPrice: totalPrice,
      });
    })
    .catch((err) => console.error(err));
};
const postCart = (req, res, next) => {
  const { productId: id } = req.body;

  Product.findById(id)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => res.redirect("/cart"));
};

const postDeleteCartProduct = async (req, res, next) => {
  const { productId: id } = req.body;
  await req.user.deleteCartbyId(id);
  res.redirect("/cart");
};
const getCheckout = (req, res) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
const getOrders = (req, res) => {
    // Pending implementation
    res.redirect('/');
};
const postOrders = (req, res, next) => {
    // Pending implementation
    res.redirect('/');
};

export {
  getProducts,
  getIndex,
  getCart,
  getCheckout,
  getOrders,
  getProductId,
  postCart,
  postDeleteCartProduct,
  postOrders,
};
