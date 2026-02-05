const app = require("./src/app");
const notesDB = require("./config/notesDB");
notesDB();
app.listen(3000,()=>{
    console.log("Server is Running")
});