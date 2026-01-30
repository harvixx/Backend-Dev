const app = require("./src/app")
const connectTodb = require("./config/notedb");
connectTodb();
app.listen(3000,()=>{
    console.log("Server is starting")
})