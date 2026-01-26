// @ts-nocheck
// importing core modules
import path from "path";

// Importing express
import express from "express";

// Importing Routes
import { router as adminRoutes } from "./routes/admin.js";
import shopRoutes from "./routes/shop.js";
import { pageNotFound } from "./controllers/404.js";
import { sequelize } from "./util/database.js";
import { Product } from "./models/product.js";
import { User } from "./models/user.js";
import { Cart } from "./models/cart.js";
import { CartItem } from "./models/cart-item.js";

const app = express();

//? {for EJS}
// 1. Activating the engine so that it knows we are using ejs for templatings
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//? middleware to parse the body from the request received
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//? middlewares for routes
app.use(async (req, res, next) => {
  try {
    const user = await User.findByPk(1);
    if (!user) {
      return next();
    }
    // @ts-ignore
    req.user = user;
    next();
  } catch (err) {
    console.error("Auth Middleware Error:", err);
    next(err);
  }
});
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(pageNotFound);

//? connecting DB with the server
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Product.belongsToMany(Cart, { through: CartItem });
Cart.belongsToMany(Product, { through: CartItem });

sequelize
  // .sync({ force: true })
  .sync()
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Ahmad", email: "MrSheikho@gmail.com" });
    }
    return user;
  })
  .then((user) => {
    return user.getCart().then((cart) => {
      if (!cart) {
        return user.createCart();
      }
      return cart;
    });
  })
  .then((cart) => {
    console.log("DB connected successfully");

    //? using express's app function to listen to 3000 port if DB is connected successfully
    app.listen(3000);
  })
  .catch((err) => {
    console.error(err);
  });
