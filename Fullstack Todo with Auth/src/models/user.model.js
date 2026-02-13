const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"name is required"],
            trim: true
        },
        email:{
            type:String,
            required:[true,"email is required"],
            unique:true,
            trim:true,
            lowercase:true
        },
        password:{
            type:String,
            select: false,
            required:[true,"password is required"],
            minlength:[8,"Password must have atleast 8 characters"],
            match:[/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,"Password must contain uppercase ,lowercase and special Character"]
        }
    },{timestamps:true}
);

userSchema.pre("save",async function() {
    if(!this.isModified("password")) return;
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password , saltRounds);
})

const User = mongoose.model("user",userSchema);
module.exports = User;