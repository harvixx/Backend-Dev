const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
async function register(req, res) {
    try {

        const { username, email, password, bio, profileImage } = req.body;

        const user = await User.create({
            username,
            email,
            password,
            bio,
            profileImage
        });
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        )
        res.cookie("accesstoken", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return res.status(201).json({
            success: true,
            message: "Account created successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        // duplicate key error
        if (error.code === 11000 || error?.cause?.code === 11000) {

            const key = error.keyValue || error.cause.keyValue;
            const field = Object.keys(key)[0];

            return res.status(409).json({
                success: false,
                message: `${field} already exists`
            });
        }

        // mongoose validation errors
        if (error.name === "ValidationError") {

            const errors = Object.values(error.errors).map(err => err.message);

            return res.status(400).json({
                success: false,
                errors
            });
        }

        console.error("Register Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}
async function login(req, res) {
    try {
        const { identifier, password } = req.body;
        if (!identifier) {
            return res.status(400).json({
                message: "Please Enter email or Username"
            });
        }
        if (!password) {
            return res.status(400).json({
                message: "Please Enter Password"
            });
        }
        const user = await User.findOne({
            $or: [
                { username: identifier },
                { email: identifier }
            ]
        }
        ).select("+password")
        if (!user) {
            return res.status(401).json({
                message: "Invalid Username or email"
            })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid Password"
            })
        }
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET, { expiresIn: "7d" }
        )
        res.cookie("accesstoken", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return res.status(201).json({
            success: true,
            message: "Login successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Login Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}
module.exports = { register, login };