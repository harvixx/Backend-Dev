const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            unique:[true,"Username already exists"],
            required:[true,"Username is required"]
        },
        email:{
            type:String,
            unique:[true,"Email already exists"],
            required:[true,"Email is required"],
            lowercase:true,
            trim:true
        },
        password:{
            type:String,
            select: false,
            required:[true,"password is required"],
            minlength:[8,"Password must have atleast 8 characters"],
            match:[/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,"Password must contain uppercase ,lowercase and special Character"]
        },
        bio:String,
        profileImage:{
            type:String,
            default:"https://ik.imagekit.io/t0v6sj1mh/defaultpfp.jpg?updatedAt=1771483691929"
        }
    },{timestamps:true}
)

userSchema.pre("save",async function(){
    if(!this.isModified("password")) return ;
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password,saltRounds);
})

const User = mongoose.model("user",userSchema);
module.exports = User;
