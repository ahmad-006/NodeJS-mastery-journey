import { Order } from "../models/order.js";
import { Product } from "../models/product.js";

const getIndex = async (req, res) => {
  const products = await Product.find();
  res.render("shop/index", {
    prods: products,
    pageTitle: "Shop",
    path: "/",
  });
};

const getProducts = async (req, res) => {
  const products = await Product.find();
  res.render("shop/products-list", {
    prods: products,
    pageTitle: "All Products",
    path: "/products",
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

const getCart = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .then((user) => {
      // Filter out items where the associated product no longer exists
      const products = user.cart.items.filter((item) => item.productId);

      let totalPrice = 0;
      products.forEach((p) => {
        totalPrice += p.productId.price * p.quantity;
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


const postCart = async (req, res, next) => {
  const { productId: id } = req.body;
  try {
    const product = await Product.findById(id);
    await req.user.addToCart(product);
    res.redirect("/cart");
  } catch (err) {
    console.error(err);
  }
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
const getOrders = async (req, res) => {
  const orders = await Order.find({ "user.userId": req.user._id });
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
    orders,
  });
};
const postOrders = async (req, res, next) => {
  try {
    const user = await req.user.populate("cart.items.productId");
    // updating products to required form
    const products = user.cart.items.map((p) => {
      return { product: { ...p.productId._doc }, quantity: p.quantity };
    });

    //creating a new order
    const newOrder = await new Order({
      products,
      user: {
        name: req.user.name,
        userId: req.user._id,
      },
    });
    //saving the order
    await newOrder.save();

    //clearing the cart
    req.user.cart.items = [];
    await req.user.save();

    res.redirect("/orders");
  } catch (error) {}
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
