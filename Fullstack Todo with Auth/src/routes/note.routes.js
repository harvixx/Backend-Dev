const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const noteRouter = express.Router();

module.exports = noteRouter;