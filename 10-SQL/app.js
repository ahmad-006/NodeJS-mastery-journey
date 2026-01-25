// importing core modules
import path from "path";

// Importing express
import express from "express";

// Importing Routes
import { router as adminRoutes } from "./routes/admin.js";
import shopRoutes from "./routes/shop.js";
import { pageNotFound } from "./controllers/404.js";
import { sequelize } from "./util/database.js";

const app = express();

//? {for EJS}
// 1. Activating the engine so that it knows we are using ejs for templatings
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//? middleware to parse the body from the request received
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//? middlewares for routes
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(pageNotFound);

//? connecting DB with the server
sequelize
  .sync()
  .then((result) => {
    console.log("DB connected sucs\cessfully");
    //? using express's app function to listen to 3000 port if DB is connected successfully
    app.listen(3000);
  })
  .catch((err) => {
    console.error(err);
  });
