// @ts-nocheck
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
  req.user
    .getCart()
    .then((cart) => {
      return cart
        .getProducts()
        .then((products) => {
          let totalPrice = 0;
          products.forEach((p) => {
            totalPrice += p.price * p.cartItem.quantity;
          });
          res.render("shop/cart", {
            path: "/cart",
            pageTitle: "Your Cart",
            products: products,
            totalPrice: totalPrice,
          });
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
};
const postCart = (req, res, next) => {
  const { productId: id } = req.body;
  let fetchedCart;
  let newQuantity = 1;

  req.user.getCart().then((cart) => {
    fetchedCart = cart;
    return fetchedCart
      .getProducts({
        where: {
          id,
        },
      })
      .then((products) => {
        let product;
        if (products) {
          product = products[0];
        }

        if (product) {
          const oldQuanity = product.cartItem.quantity;
          newQuantity += oldQuanity;
          return product;
        }

        return Product.findByPk(id);
      })
      .then((product) => {
        return fetchedCart.addProduct(product, {
          through: {
            quantity: newQuantity,
          },
        });
      })
      .then(() => {
        res.redirect("/cart");
      })
      .catch((err) => console.error(err));
  });
};
const getCheckout = (req, res) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
const getOrders = (req, res) => {
  req.user
    .getOrders({ include: ["products"] })
    .then((orders) => {
      res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
        orders,
      });
    })
    .catch((err) => console.error(err));
};
const postOrders = (req, res, next) => {
  let fetchedProducts;
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then((products) => {
      fetchedProducts = products;
      return req.user.createOrder();
    })
    .then((order) => {
      order.addProduct(
        fetchedProducts.map((prod) => {
          prod.orderItem = { quantity: prod.cartItem.quantity };
          return prod;
        }),
      );
    })
    .then(() => {
      return fetchedCart.setProducts(null);
    })
    .then(() => res.redirect("/orders"))
    .catch((err) => console.error(err));
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
  const { productId: id } = req.body;
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({
        where: {
          id,
        },
      });
    })
    .then((products) => {
      const product = products[0];
      const newQuantity = product.cartItem.quantity - 1;
      if (newQuantity === 0) {
        return product.cartItem.destroy();
      }
      return product.cartItem.update({ quantity: newQuantity });
    })
    .then(() => {
      res.redirect("/cart");
    });
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
