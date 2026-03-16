const likeModel = require("../models/like.model");
const Post = require("../models/post.model");

async function likePost(req, res) {
    try {
        const userId = req.user.id;
        const postId = req.params.postid;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }
        const islike = await likeModel.findOne({
            post: post._id,
            user: userId
        });

        if (islike) {
            return res.status(409).json({
                message: "You cant like liked post"
            });
        }

        await likeModel.create({
            post: post._id,
            user: userId
        })
        return res.status(201).json({
            message: "Post liked successfully"
        });
    } catch (error) {
        console.error(error);
        if (error.code === 11000 || error?.cause?.code === 11000) {
            return res.status(409).json({
                message: "You cant like liked post"
            });
        }
        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: error.message  // yahan required wala message aayega
            });
        }
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}
async function UnlikePost(req, res) {
    try {
        const userId = req.user.id;
        const postId = req.params.postid;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }
        const islike = await likeModel.findOne({
            post: post._id,
            user: userId
        });

        if (!islike) {
            return res.status(409).json({
                message: "You have not liked this post"
            });
        }
        await likeModel.findByIdAndDelete(islike._id);
        return res.status(200).json({
            message: "Post Unliked successfully"
        });
    } catch (error) {
        console.error(error);
        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: error.message  // yahan required wala message aayega
            });
        }
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}
module.exports = { likePost, UnlikePost }