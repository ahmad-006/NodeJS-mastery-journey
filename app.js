//importing nodejs core modules
import http from "http";

// Importing express
import express from "express";

const app = express();

//?adding a middleware
app.use((req, res, next) => {
  console.log("Hello from the middleware...!");

  //? next() allows program to move to next middleware
  next();
});

// 'app' is just a function with the signature (req, res, next).
// We can pass it to the raw Node HTTP server to handle all incoming requests.
const server = http.createServer(app);

// Starts the server process and keeps the Event Loop running on port 3000.
server.listen(3000);
