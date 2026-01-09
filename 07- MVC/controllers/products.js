const getAddProducts = (req, res) => {
  res.render("add-product", {
    pageTitle: "Add product",
    path: "/admin/add-product",
  });
};

const products = [];
const postAddProduct = (req, res) => {
  products.push({ title: req.body.title });
  res.redirect("/");
};

export { getAddProducts, postAddProduct };
