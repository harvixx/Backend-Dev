const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const { createFolder, getFolder, deleteFolder, renameFolder } = require("../controllers/folder.controller");
const folderRouter = express.Router();
folderRouter.post("/", authMiddleware, createFolder);
folderRouter.get("/", authMiddleware, getFolder);
folderRouter.delete("/:id", authMiddleware, deleteFolder);
folderRouter.patch("/:id", authMiddleware, renameFolder);
module.exports = folderRouter;