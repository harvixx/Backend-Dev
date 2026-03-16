const followModel = require("../models/follow.model");
const User = require("../models/user.model");
async function followUser(req, res) {
    try {
        const followerid = req.user.id;
        const followingid = req.params.userid;

        if (followerid.toString() === followingid.toString()) {
            return res.status(400).json({
                message: "You cant follow yourself"
            });
        }
        const followingUser = await User.findById(followingid).select("username");
        if (!followingUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        const isFollowing = await followModel.findOne({
            follower: followerid,
            following: followingid
        });

        if (isFollowing) {
            return res.status(409).json({
                message: "You can't follow twice"
            });
        }

        await followModel.create({
            follower: followerid,
            following: followingid,
            status: "pending"
        })
        return res.status(201).json({
            message: `Follow request sent to : ${followingUser.username}`,
        });
    } catch (error) {
        console.error(error);
        if (error.code === 11000 || error?.cause?.code === 11000) {
            return res.status(409).json({
                message: "You cant follow twice"
            });
        }
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}
async function unfollowUser(req, res) {
    try {
        const followerid = req.user.id;
        const followingid = req.params.userid;

        if (followerid.toString() === followingid.toString()) {
            return res.status(400).json({
                message: "You can't unfollow yourself"
            });
        }
        const followingUser = await User.findById(followingid).select("username");
        if (!followingUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        const isFollowing = await followModel.findOne({
            follower: followerid,
            following: followingid
        });
        if (!isFollowing) {
            return res.status(400).json({
                message: `You are not following : ${followingUser.username}`
            });
        }
        await followModel.findByIdAndDelete(isFollowing._id)
        return res.status(200).json({
            message: `You have unfollowed : ${followingUser.username}`
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}
async function updateFollowStatus(req, res) {
    try {
        const userid = req.user.id;
        const followerid = req.params.followerid;
        const { status } = req.params;

        if (!["accepted", "rejected"].includes(status)) {
            return res.status(400).json({
                message: "Status can only be accepted or rejected"
            });
        }
        const isrequested = await followModel.findOneAndUpdate(
            {

                follower: followerid,
                following: userid,
                status: "pending"
            },
            { status },
            { returnDocument: 'after' }
        );

        if (!isrequested) {
            return res.status(404).json({
                message: "Follow request not found"
            });
        }
        return res.status(200).json({
            message: `Request ${status}`
        });

    }

    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }

}

module.exports = { followUser, unfollowUser, updateFollowStatus }
