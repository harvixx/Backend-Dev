const express = require("express");
const userModel = require("../models/user.model");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authMiddleware = require("../middlewares/auth.middlewares")

authRouter.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await userModel.create({ name, email, password });
        return res.status(201).json({
            message: "User is Created"
        })

    } catch (error) {
        console.log("Error -> " + error);

        if (error.code === 11000) {
            return res.status(409).json({
                message: "User already exist with this email"
            })
        }
        else if (error.name === "ValidationError") {
            const msg = Object.values(error.errors)[0].message;
            return res.status(400).json({
                message: msg
            })
        }
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

authRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            })
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            })
        }
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
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
        });

        return res.status(200).json({
            message: "Login successfull"
        })
    } catch (error) {
        console.log("LOGIN ERROR 👉", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
})

authRouter.get("/profile", authMiddleware, (req, res) => {
    res.json({
        message: "This is protected data",
        user: req.user
    });
});
module.exports = authRouter;
