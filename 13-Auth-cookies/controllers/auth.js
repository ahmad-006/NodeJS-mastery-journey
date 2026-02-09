import { User } from "../models/user.js";

export const getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
  });
};

export const postLogin = async (req, res, next) => {
  const user = await User.findById("6980c48cf45b79db1d3a3033");
  req.session.isLoggedIn = true;
  req.session.user = user;
  req.session.save((err) => {
    if (err) console.log(err);
    res.redirect("/");
  });
};

export const postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) console.log(err);
    res.redirect("/");
  });
};