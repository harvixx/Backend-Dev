const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await userModel.create({ name, email, password });
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        )
        res.cookie("jwt_token",token);
        return res.status(201).json({
            message: "User is Created",
        })
    }

    catch (error) {

        console.log("ERROR 👉", error);

        if (error.code === 11000) {
            return res.status(409).send("user already exist with this email")
        }
        else if (error.name === "ValidationError") {
            const msg = Object.values(error.errors)[0].message;
            return res.status(400).send({ message: msg })
        }
        return res.status(500).json({
            message: "Internal server error"
        });
    }
})
module.exports = authRouter;