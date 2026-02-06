const express = require("express");
const app = express();
app.use(express.json());
const notesModel = require("../models/notes.model")
const path = require("path")

const cors = require("cors");
app.post("/api/notes", async (req, res) => {
    try {
        const { title, Desc } = req.body;
        const note = await notesModel.create({ title, Desc });
        res.status(201).json({
            message: "Note Created",
            note
        })
    } catch (error) {
        console.log("Something Wrong " + error)
    }
})
app.get("/api/notes", async (req, res) => {
    try {
        const notes = await notesModel.find()
        res.send(notes)
    } catch (error) {
        console.log("Something Wrong " + error)
    }
})
app.delete("/api/notes/:id", async (req, res) => {
    try {
        const noteID = req.params.id;
        await notesModel.findByIdAndDelete(noteID)
        res.status(200).json("Note Deleted")
    } catch (error) {
        console.log("Something Wrong " + error)
    }
})
app.patch("/api/notes/:id", async (req, res) => {
    try {
        const allowUpdates = ["title", "Desc"];
        const Update = {};

        allowUpdates.forEach((a) => {
            if (req.body[a] !== undefined) {
                Update[a] = req.body[a];
            }
        })

        const updatedItem = await notesModel.findByIdAndUpdate(
            req.params.id,
            { $set: Update },
            { new: true, runValidators: true }
        )

        if (!updatedItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.status(200).json({
            messag: "Item Updated"
        })
    }
    catch (error) {
        console.log("Server Error" + error);
    }
})
const frontendPath = path.join(__dirname, "../Frontend/dist");

app.get("*name", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
});
app.use(express.static(frontendPath));

module.exports = app;