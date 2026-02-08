import express from "express";
import { getLogin, postLogin, postLogout } from "../controllers/auth.js";

const router = express.Router();
router.get("/login", getLogin).post("/login", postLogin);
router.post("/logout", postLogout);

export default router;
