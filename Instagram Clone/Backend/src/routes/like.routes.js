const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const { likePost, UnlikePost } = require("../controller/like.controller");
const validateObjectId = require("../middleware/validateObjectId");
const likeRouter = express.Router();

likeRouter.post("/like/:postid", authMiddleware, validateObjectId, likePost);
likeRouter.delete("/unlike/:postid", authMiddleware, validateObjectId, UnlikePost);
module.exports = likeRouter;