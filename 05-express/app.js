//importing nodejs core modules
import http from "http";

// Importing express
import express from "express";

const app = express();

app.use(express.urlencoded({ extended: false }));

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

//? add-product route
app.use("/add-product", (req, res, next) => {
  res.send(
    "<form action='/product' method='POST'><input type='text' name='title' placeholder='Enter the title'><button type='submit'>Submit</button> </form>"
  );
});

//? implementing /product route
// Using app.post so that it only receives post requests
app.post("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

//? /  (default) route
app.use("/", (req, res, next) => {
  res.send("<h1>Hello from the ExpressJS......</h1>");
});

// //*         Semi - Vanilla Way
// 'app' is just a function with the signature (req, res, next).
// We can pass it to the raw Node HTTP server to handle all incoming requests.
// const server = http.createServer(app);

// //? Starts the server process and keeps the Event Loop running on port 3000.
// server.listen(3000);

// //*         Express Way
//? using express's app function to listen to 3000 port
app.listen(3000);
