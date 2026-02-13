const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.routes");
const noteRouter = require("./routes/note.routes");
const folderRouter = require("./routes/folder.routes");
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRouter);
app.use("/api/folder",folderRouter);
module.exports = app;