const Folder = require("../models/folder.model");
const Note = require("../models/note.model");
const mongoose = require("mongoose");
async function createFolder(req, res) {
    try {
        const { name } = req.body;

        if (!name || name.trim() === "") {
            return res.status(400).json(
                {
                    message: "Folder name is required"
                }
            )
        }

        const folder = await Folder.create(
            { name, userId: req.user.id }
        );

        return res.status(201).json({
            message: "Folder created",
            folder
        });
    } catch (error) {

        if (error.code === 11000) {
            return res.status(409).json({
                message: "Folder with this name already exists"
            });
        }
        return res.status(500).json({
            message: error.message
        });
    }
}

async function getFolder(req, res) {
    try {
        const folders = await Folder.find(
            {
                userId: req.user.id,
                isDeleted: false
            }
        ).sort({ createdAt: -1 });

        return res.status(200).json({
            folders
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

async function deleteFolder(req, res) {
    try {
        const folderId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(folderId)) {
            return res.status(400).json({
                message: "Invalid folder ID"
            });
        }

        const folder = await Folder.findOne({
            _id: folderId,
            userId: req.user.id,
            isDeleted: false
        });

        if (!folder) {
            return res.status(404).json(
                { message: "Folder not found" }
            )
        }
        folder.isDeleted = true;
        await folder.save();

        await Note.updateMany(
            {
                folderId: folderId,
                isDeleted: false,
                userId: req.user.id
            },
            {
                isDeleted: true
            }
        )

        return res.status(200).json({
            message: "Folder moved to trash"
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }

}

async function renameFolder(req, res) {
    try {
        const folderId = req.params.id;
        const { name } = req.body;
        if (!mongoose.Types.ObjectId.isValid(folderId)) {
            return res.status(400).json({
                message: "Invalid folder Id"
            })
        }
        if (!name || name.trim() === "") {
            return res.status(400).json({ message: "Name required" });
        }

        const folder = await Folder.findOne(
            {
                _id: folderId,
                userId: req.user.id,
                isDeleted: false
            }
        )
        if (!folder) {
            return res.status(404).json({ message: "Folder not found" });
        }

        if (folder.name === name.trim()) {
            return res.status(200).json({
                message: "No changes made",
                folder
            });
        }

        folder.name = name.trim();
        await folder.save();

        res.status(200).json({ message: "Folder renamed", folder });
    } catch (error) {

        if (error.code === 11000) {
            return res.status(409).json({
                message: "Folder with this name already exists"
            });
        }

        return res.status(500).json({
            message: error.message
        })
    }
}
module.exports = { createFolder, getFolder, deleteFolder, renameFolder }