const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "name is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            lowercase: true,
            index: true
        },
        password: {
            type: String,
            required: [true, "password is required"],
            minlength: [8,"Password must be at least 8 characters long"],
            match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must contain uppercase, lowercase, number & special character"]
        }
    }
)

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return ;
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
});
const userModel = mongoose.model("user", userSchema);
module.exports = userModel;