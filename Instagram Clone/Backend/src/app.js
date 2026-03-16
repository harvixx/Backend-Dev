const express = require("express");
const cors = require("cors")
const cookieparser = require("cookie-parser")
const app = express();
app.use(cors({
    origin: "http://localhost:5173",  // sirf yahi allow hai
    credentials: true                  // cookies bhi jaayengi
}))
app.use(express.json());
app.use(cookieparser());
// require routers
const authRouter = require("./routes/auth.routes");
const postRouter = require("./routes/post.routes");
const followRouter = require("./routes/follow.routes");
const likeRouter = require("./routes/like.routes");
// Initialize routers
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/follow", followRouter)
app.use("/api/likes", likeRouter)
module.exports = app;