import path from "path";

import express from "express";

const router = express.Router();

//? /  (default) route
router.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../", "views", "shop.html"));
});

export default router;
