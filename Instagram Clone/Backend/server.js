require("dotenv").config();
const app = require("./src/app");
const connectToDB = require("./src/config/database");
port = 3000;
(async()=>{
    try {
        await connectToDB();
        app.listen(process.env.PORT || port , ()=>{
            console.log("Server is running");
        });
        
    } catch (error) {
        console.log("Server error ",error);
        process.exit(1);
    }
})();