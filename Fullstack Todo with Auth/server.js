require("dotenv").config();
const app = require("./src/app");
const connectToDB = require("./src/config/database");
const Port = 3000;
(
    async () => {
        try {
            await connectToDB();
            app.listen(process.env.PORT || Port, () => {
                console.log("Server is running");
            })
        } catch (error) {
            console.log("Failed to start thr server ",error);
            process.exit(1);
        }
    }
)();