require("dotenv").config();
const app = require("./src/app");
const connectToDb = require("./src/config/database");
const Port = 3000;

(
async ()=>{
    try {
        await connectToDb();
        app.listen(process.env.PORT || Port,()=>{
            console.log("Server is running");
        })
    } catch (error) {
        console.error("❌ Failed to start server:", error);
        process.exit(1);
    }
}
)()