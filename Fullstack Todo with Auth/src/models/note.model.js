const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Note title is required"],
            trim: true,
            minlength: [1, "Folder name cannot be empty"]
        },

        content: {
            type: String,
            trim: true,
            default: "",
            minlength: [1, "Folder name cannot be empty"]
        },

        color: {
            type: String,
            enum: ["yellow", "purple", "red"],
            default: "yellow"
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true
        },

        folderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "folder",
            default: null
        },

        isArchived: {
            type: Boolean,
            default: false
        },

        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

const Note = mongoose.model("note", noteSchema);
module.exports = Note;
