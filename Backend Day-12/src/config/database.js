const mongoose = require("mongoose");
const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connect to Database");
    } catch (error) {
        console.log("Unable TO Connect to Database "+error);
    }
}
module.exports=connectToDB;