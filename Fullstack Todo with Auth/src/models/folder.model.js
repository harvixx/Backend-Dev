const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Folder name is required"],
            trim: true,
            minlength: [1, "Folder name cannot be empty"]
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    }, { timestamps: true }
)
folderSchema.index(
    { name: 1, userId: 1 },
    { unique: true }
);
const Folder = mongoose.model("folder", folderSchema);
module.exports = Folder;