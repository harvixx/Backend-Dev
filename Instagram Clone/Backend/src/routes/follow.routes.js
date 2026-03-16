const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const { followUser, unfollowUser, updateFollowStatus } = require("../controller/follow.controller");
const validateObjectId = require("../middleware/validateObjectId");
const { isValidObjectId } = require("mongoose");
const followRouter = express.Router();

followRouter.post("/Dofollow/:userid", authMiddleware, validateObjectId, followUser);
followRouter.post("/Unfollow/:userid", authMiddleware, validateObjectId, unfollowUser);
followRouter.patch("/updateFollowStatus/:followerid/:status", authMiddleware, validateObjectId, updateFollowStatus);
module.exports = followRouter;