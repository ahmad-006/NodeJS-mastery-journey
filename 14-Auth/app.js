// @ts-nocheck
// importing core modules
import path from "path";

// Importing packages
import express from "express";
import { connectMongoose } from "./util/database.js";
import { User } from "./models/user.js";
import session from "express-session";
import MongoDBSession from "connect-mongodb-session";
import flash from "connect-flash";

// Importing Routes
import { router as adminRoutes } from "./routes/admin.js";
import shopRoutes from "./routes/shop.js";
import authRoutes from "./routes/auth.js";
import { pageNotFound } from "./controllers/404.js";

const app = express();
const __dirname = path.dirname(process.argv[1]);
const MongoDBStore = MongoDBSession(session);
const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: "sessions",
});

//? {for EJS}
// 1. Activating the engine so that it knows we are using ejs for templatings
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//? middleware to parse the body from the request received
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store,
  }),
);
app.use(flash());

//? middlewares for routes
app.use(async (req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  try {
    const user = await User.findById(req.session.user._id);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  next();
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(pageNotFound);

try {
  connectMongoose().then(() => {
    app.listen(3000);
    console.log("app running");
  });
} catch (error) {
  console.error("ERROR:", error.message);
}
