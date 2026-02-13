const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

async function register(req, res) {
    try {
        const { name, email, password } = req.body;
        const user = await User.create({ name, email, password });
        return res.status(201).json({
            message: "Account Created"
        })
    } catch (error) {
        console.log("Error -> ", error);
        if (error.code === 11000) {
            return res.status(409).json({
                message: "User already exist with this email address"
            })
        }
        else if (error.name === "ValidationError") {
            const msg = Object.values(error.errors)[0].message;
            return res.status(400).json({
                message: msg
            })
        }
        return res.status(500).json({
            message: "Internal server Error"
        })
    }
}
async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Enter email or password"
            });
        }
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(401).json({
                message: "Inavlid email or password"
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Inavlid email or password"
            });
        }
        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXP || "7d"
            }
        )
        res.cookie("accessToken", token, {
            httpOnly: true,
            sameSite: "strict",
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.status(200).json({
            message: "Login successfull"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error " + error
        })
    }
}
function logout(req, res) {
    res.clearCookie("accessToken");
    return res.status(200).json({
        message: "Logout successfull"
    });
}
async function getProfile(req, res) {
    try {
        const user = await User.findById(req.user.id).select("-password");

        return res.status(200).json({
            user
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error fetching profile"
        });
    }
}
module.exports={
    register,login,logout,getProfile
}