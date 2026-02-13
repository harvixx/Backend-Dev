const express = require("express");
const authRouter = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const { register, login, logout, getProfile } = require("../controllers/auth.controller");


authRouter.post("/register", register)
authRouter.post("/login", login)
authRouter.post("/logout", authMiddleware, logout)
authRouter.get("/me", authMiddleware, getProfile); module.exports = authRouter;