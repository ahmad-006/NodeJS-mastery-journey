import { Cart } from "../models/cart.js";
import { Product } from "../models/product.js";

const getIndex = (req, res) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => console.error(err));
};

const getProducts = (req, res) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/products-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => console.error(err));
};
const getCart = (req, res) => {
  Cart.getCart((cart) => {
    const cartProducts = [];
    Product.fetchAll((products) => {
      if (cart) {
        for (let product of products) {
          const cartProduct = cart.products.find((p) => p.id === product.id);
          if (cartProduct) {
            cartProducts.push({ product, qty: cartProduct.qty });
          }
        }
      }
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: cartProducts,
        totalPrice: cart ? cart.totalPrice : 0,
      });
    });
  });
};
const postCart = (req, res, next) => {
  const { productId } = req.body;
  Product.FindById(productId, (product) => {
    Cart.addProduct(product.id, product.price);
  });
  res.redirect("/cart");
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
  Product.findByPk(productId)
    .then((product) => {
      res.render("shop/product-detail", {
        pageTitle: product.title,
        product: product,
        path: "/products",
      });
    })
    .catch((err) => console.log(err.sqlMessage));
};

const postDeleteCartProduct = (req, res, next) => {
  const { productId, price } = req.body;
  Cart.deleteProduct(productId, price);
  res.redirect("/cart");
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
};
