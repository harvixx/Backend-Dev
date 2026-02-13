const Folder = require("../models/folder.model");
const Note = require("../models/note.model");
const mongoose = require("mongoose");
async function createNote(req, res) {
    try {
        const { title, content, folderId, color } = req.body;
        if (!title || title.trim() === "") {
            return res.status(400).json({
                message: "Title is required"
            });
        }
        let validFolderId = null;
        if (folderId) {
            if (!mongoose.Types.ObjectId.isValid(folderId)) {
                return res.status(400).json({
                    message: "Invalid folder ID"
                });
            }
            const folder = await Folder.findOne(
                {
                    _id: folderId,
                    userId: req.user.id,
                    isDeleted: false
                }
            )

            if (!folder) {
                return res.status(404).json({
                    message: "Folder not found"
                });
            }
            validFolderId = folderId;
        }

        const note = await Note.create(
            {
                title: title.trim(),
                content: content || "",
                color: color || "yellow",
                folderId: validFolderId || null,
                userId: req.user.id
            });

        return res.status(201).json({
            message: "Note Created",
            note
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

async function getNotes(req, res) {
    try {
        const { folder, archived, recent } = req.query;
        const filter = {
            userId: req.user.id,
            isDeleted: false
        }
        if (recent === "true") {
            filter.isArchived = false;
            const notes = await Note.find(filter)
                .sort({ updatedAt: -1 })
                .limit(5);
            return res.status(200).json({
                notes
            })
        }

        if (archived === "true") {
            filter.isArchived = true;
        }
        else {
            filter.isArchived = true;
        }

        if (folder) {
            if (!mongoose.Types.ObjectId.isValid(folder)) {
                return res.status(400).json({
                    message: "Invalid folder ID"
                });
            }

            filter.folderId = folder;
        }

        const notes = await Note.find(filter)
            .sort({ updatedAt: -1 });
        return res.status(200).json({
            notes
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

async function deleteNote(req, res) {
    try {
        const noteId = req.params.id
        if (!mongoose.Types.ObjectId.isValid(noteId)) {
            return res.status(400).json({
                message: "Invalid Note ID"
            });
        }
        const note = await Note.findOne({
            _id: noteId,
            userId: req.user.id,
            isDeleted: false
        })

        if (!note) {
            return res.status(404).json({ message: "note not found" });
        }

        note.isDeleted = true;
        await note.save();

        return res.status(400).json({
            message: "Note moved to trash"
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

async function isArcheive(req, res) {
    try {
        const noteId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(noteId)) {
            return res.status(400).json(
                {
                    message: "Invalid noteId"
                }
            )
        }
        const note = await Note.findOne({
            _id: noteId,
            userId: req.user.id,
            isDeleted: false
        })
        if (!note) {
            return res.status(404).json(
                {
                    message: "Note not found"
                }
            )
        }
        note.isArchived = !note.isArchived;
        await note.save();
        return res.status(200).json(
            {
                message: note.isArchived
                    ? "Note Archeived"
                    : "Note unarcheived"
            }
        )
    } catch (error) {
        return res.status(400).json(
            {
                message: error.message
            }
        )
    }
}
async function restoreNote(req, res) {
    try {
        const noteId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(noteId)) {
            return res.status(400).json({
                message: "Invalid Note Id"
            })
        }
        const note = await Note.findOne({
            _id: noteId,
            userId: req.user.id,
            isDeleted: true
        })
        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            })
        }
        note.isDeleted = false;
        await note.save();

        return res.status(200).json({
            message: "Note restored",
            note
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}
async function getTrashNotes(req, res) {
    try {
        const notes = await Note.find({
            userId: req.user.id,
            isDeleted: true
        }).sort({ updatedAt: -1 });

        return res.status(200).json({ notes });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

module.exports = { createNote, getNotes, deleteNote, isArcheive, restoreNote };