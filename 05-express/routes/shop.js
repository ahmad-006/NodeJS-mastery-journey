import express from "express";

const router = express.Router();

//? /  (default) route
router.get("/", (req, res, next) => {
  res.send("<h1>Hello from the ExpressJS......</h1>");
});

export default router;
