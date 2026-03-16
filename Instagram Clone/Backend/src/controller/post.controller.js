const imagekit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const Post = require("../models/post.model");
const Imagekit = new imagekit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});
async function createPost(req, res) {
    try {
        const file = await Imagekit.files.upload({
            file: await toFile(Buffer.from(req.file.buffer), 'file'),
            fileName: `post_${Date.now()}.jpg`,
            folder: "Insta-clone-Posts"
        });
        const post = await Post.create(
            {
                caption: req.body.caption,
                imageUrl: file.url,
                userId: req.user.id
            }
        )
        return res.status(201).json({
            message: "Post created",
            post
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }

}
async function getallPost(req, res) {
    try {
        const userId = req.user.id;
        const posts = await Post.find({
            userId: userId
        })
        if (posts.length < 1) {
            return res.status(404).json({
                message: "No post found"
            });
        }
        return res.status(200).json({
            message: "Post fetched successfully",
            posts
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}
async function getpostDetail(req, res) {
    try {
        const postId = req.params.userid;
        const post = await Post.findById(
            postId
        )
        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }
        const isValid = req.user.id === post.userId.toString();
        if (!isValid) {
            return res.status(403).json({
                message: "Forbidden content"
            });
        }
        return res.status(200).json({
            message: "Post fetched",
            post
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}
module.exports = { createPost, getallPost,getpostDetail};