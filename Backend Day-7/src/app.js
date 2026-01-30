const express = require("express");
const app = express();
const Note = require("../models/notes.model")
app.use(express.json());
app.post("/notes", async (req, res) => {
    const { title, description } = req.body;
    await Note.create({
        title, description
    })
    res.status(201).json({
        message:"created"
    })})

module.exports = app;