const mongoose = require("mongoose");

const followSchema = new mongoose.Schema(
    {
        follower: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",                              
            required: [true, "follower is required"]
        },
        following: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",                              
            required: [true, "following is required"]
        },
        status:{
            type:String,
            default:"pending",
            enum:{
                values:["pending", "accepted", "rejected"],
                message:"status can only be pending , accepted or rejected"
            }
        }
    },
    { timestamps: true }
);

// Duplicate follow rokne ke liye
followSchema.index({ follower: 1, following: 1 }, { unique: true });

const followModel = mongoose.model("follow", followSchema);
module.exports = followModel;