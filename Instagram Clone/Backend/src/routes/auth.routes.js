const express = require("express");
const { register, login, getme, logout } = require("../controller/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");
const authRouter = express.Router();
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/getme", authMiddleware, getme);
authRouter.post("/logout", authMiddleware, logout);
module.exports = authRouter;