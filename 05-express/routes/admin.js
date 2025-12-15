import express from "express";

const router = express.Router();

//? add-product route
router.get("/add-product", (req, res, next) => {
  res.send(
    "<form action='/product' method='POST'><input type='text' name='title' placeholder='Enter the title'><button type='submit'>Submit</button> </form>"
  );
});

//? implementing /product route
// Using app.post so that it only receives post requests
router.post("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

export default router;
