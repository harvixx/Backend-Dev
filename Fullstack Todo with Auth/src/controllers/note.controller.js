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
        const { folder, archived, recent, search, page, limit } = req.query;
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
        filter.isArchived = archived === "true";

        if (folder) {
            if (!mongoose.Types.ObjectId.isValid(folder)) {
                return res.status(400).json({
                    message: "Invalid folder ID"
                });
            }

            filter.folderId = folder;
        }

        if (search && search.trim() !== "") {
            filter.$or = [
                { title: { $regex: search.trim(), $options: "i" } },
                { content: { $regex: search.trim(), $options: "i" } }
            ];

            const pageNumber = Number(page) || 1;
            const limitNumber = Number(limit) || 10;
            const skip = (pageNumber - 1) * limitNumber;

            const notes = await Note.find(filter)
                .sort({ updatedAt: -1 })
                .skip(skip)
                .limit(limitNumber);

            const total = await Note.countDocuments(filter);

            return res.status(200).json({
                notes,
                total,
                page: pageNumber,
                totalPages: Math.ceil(total / limitNumber)
            });
        }
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

        return res.status(200).json({
            message: "Note moved to trash"
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}
async function updateNote(req, res) {
    try {
        const noteId = req.params.id;
        const { title, content, color, folderId } = req.body;
        if (!mongoose.Types.ObjectId.isValid(noteId))
            return res.status(400).json({
                message: "noteId is Invalid"
            })

        const note = await Note.findOne({
            _id: noteId,
            userId: req.user.id,
            isDeleted: false
        })

        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            })
        }

        if (title) note.title = title.trim();
        if (content !== undefined) note.content = content.trim();
        if (color) note.color = color;

        await note.save();

        return res.status(200).json({
            message: "Note updated",
            note
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}
async function toggleArcheive(req, res) {
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

        if (note.folderId) {
            const folder = await Folder.findOne({
                _id: note.folderId,
                userId: req.user.id
            });

            if (!folder || folder.isDeleted) {
                return res.status(400).json({
                    message: "Cannot restore note because its folder is deleted"
                });
            }
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
async function restoreSelectedNotes(req, res) {
    try {
        const { noteIds } = req.body;
        if (!Array.isArray(noteIds) || noteIds.length === 0) {
            return res.status(400).json({
                message: "noteId arry is required"
            });
        }
        noteIds.forEach(id => {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({
                    message: `Invalid note ID: ${id}`
                });
            }
        });

        const noteToRestore = await Note.find({
            _id: { $in: noteIds },
            userId: req.user.id,
            isDeleted: true
        })
        if (noteToRestore.length === 0) {
            return res.status(404).json({
                message: "No deleted notes found to restore"
            })
        }

        const folderIds = noteToRestore
            .map(note => note.folderId)
            .filter(id => id !== null)

        const folders = await Folder.find({
            _id: { $in: folderIds },
            userId: req.user.id
        })

        const deletedfolders = folders
            .filter(folder => folder.isDeleted)
            .map(folder => folder._id.toString())

        if (deletedfolders.length > 0) {
            return res.status(400).json({
                message: "Some notes belong to deleted folders. Restore folder first."
            })
        }

        const validIds = noteToRestore.map(note => note._id);

        const result = await Note.updateMany(
            {
                _id: { $in: validIds }
            },
            {
                isDeleted: false
            }
        );
        return res.status(200).json({
            message: "Bulk restore completed",
            requestedCount: noteIds.length,
            restoredCount: result.modifiedCount,
            ignoredCount: noteIds.length - result.modifiedCount
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }

}
module.exports = { createNote, getNotes, deleteNote, updateNote, toggleArcheive, restoreNote, getTrashNotes, restoreSelectedNotes };