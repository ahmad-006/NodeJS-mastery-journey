//importing nodejs core modules
import http from "http";
import path from "path";

// Importing express
import express from "express";

// Importing Routes
import adminRoutes from "./routes/admin.js";
import shopRoutes from "./routes/shop.js";

const app = express();

//? middleware to parse the body from the request received
app.use(express.urlencoded({ extended: false }));

//? middlewares for routes
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "pageNotFound.html"));
});

// //? Adding a middleware
// app.use((req, res, next) => {
//   console.log("Hello from the middleware...!");

//   //? next() allows request to move to next middleware
//   next();
// });

// //? Adding another middleware
// app.use((req, res, next) => {
//   console.log("Hello from second middleware");
//   res.send("<h1>Hello from the ExpressJS......</h1>");
// });

// //*         Semi - Vanilla Way
// 'app' is just a function with the signature (req, res, next).
// We can pass it to the raw Node HTTP server to handle all incoming requests.
// const server = http.createServer(app);

// //? Starts the server process and keeps the Event Loop running on port 3000.
// server.listen(3000);

// //*         Express Way
//? using express's app function to listen to 3000 port
app.listen(3000);
