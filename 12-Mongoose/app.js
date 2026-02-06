// @ts-nocheck
// importing core modules
import path from "path";

// Importing express
import express from "express";

// Importing Routes
import { router as adminRoutes } from "./routes/admin.js";
import shopRoutes from "./routes/shop.js";
import { pageNotFound } from "./controllers/404.js";
import { connectMongoose } from "./util/database.js";
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
app.use(async (req, res, next) => {
  const user = await User.findById("6980c48cf45b79db1d3a3033");

  req.user = user;
  next();
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(pageNotFound);

try {
  connectMongoose().then(() => {
    app.listen(3000);
    console.log("app running");
  });
} catch (error) {
  console.error("ERROR:", error.message);
}
