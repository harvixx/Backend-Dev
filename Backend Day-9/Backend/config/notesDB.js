const mongoose = require("mongoose");
require("dotenv").config();

async function notesDb() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connect to Notes Database");
    } catch (error) {
        console.error("Connection Failed "+error);
    }
}
module.exports=notesDb;