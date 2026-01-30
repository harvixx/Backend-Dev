const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb+srv://harish:mongo123@cluster0.nsw7vec.mongodb.net/?appName=Cluster0/day6")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Routes
const studentRoutes = require("./routes/studentRoutes");
app.use("/api", studentRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
