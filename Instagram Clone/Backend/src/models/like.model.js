const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
    {
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "post",
            required: [true, "Post id is required to do like the post"]
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: [true, "User id is required to do like"]
        }
    },
    { timestamps: true }
);

// Duplicate follow rokne ke liye
likeSchema.index({ post: 1, user: 1 }, { unique: true });

const likeModel = mongoose.model("like", likeSchema);
module.exports = likeModel;