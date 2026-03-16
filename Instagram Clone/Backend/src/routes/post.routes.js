const express = require("express");
const { createPost, getallPost, getpostDetail } = require("../controller/post.controller");
const multer = require("multer");
const authMiddleware = require("../middleware/auth.middleware");
const validateObjectId = require("../middleware/validateObjectId");
const upload = multer({ storage: multer.memoryStorage() });
const postRouter = express.Router();
postRouter.post("/createPost", authMiddleware, upload.single("imageUrl"), createPost);
postRouter.get("/getpost", authMiddleware, getallPost);
postRouter.get("/getpostDetail/:userid", authMiddleware, validateObjectId,getpostDetail);

module.exports = postRouter;