import express from "express";
const router = express.Router();
import { register, login, checkToken } from "../controllers/authController.js";

router.post("/register", register);
router.post("/login", login);
router.get("/checkToken",checkToken)

export default router;
