const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
    {
        caption:{
            type:String,
            default:""
        },
        imageUrl:{
            type:String,
            required:[true,"ImageUrl is required for creating a post"]
        },
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:[true,"User id is required for creating a post"]
        }
    }
)
const Post = mongoose.model("post",postSchema);
module.exports = Post;