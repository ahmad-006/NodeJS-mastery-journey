// @ts-nocheck
// importing core modules
import path from "path";

// Importing express
import express from "express";

// Importing Routes
import { router as adminRoutes } from "./routes/admin.js";
import shopRoutes from "./routes/shop.js";
import { pageNotFound } from "./controllers/404.js";

//import db connection
import { mongoConnect } from "./util/database.js";
import { User } from "./models/user.js";

const app = express();

//? {for EJS}
// 1. Activating the engine so that it knows we are using ejs for templatings
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//? middleware to parse the body from the request received
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//? middlewares for routes

app.use((req, res, next) => {
  User.findById("697ca8657dd4dd5d6a6eadb7")
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(pageNotFound);

mongoConnect((result) => {
  app.listen(3000);
});
