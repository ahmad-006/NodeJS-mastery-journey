const products = [];

const getAddProducts = (req, res) => {
  res.render("add-product", {
    pageTitle: "Add product",
    path: "/admin/add-product",
  });
};

const postAddProduct = (req, res) => {
  products.push({ title: req.body.title });
  res.redirect("/");
};

const getProducts = (req, res) => {
  res.render("shop", { prods: products, pageTitle: "Shop", path: "/" });
};

export { getAddProducts, postAddProduct, getProducts };
