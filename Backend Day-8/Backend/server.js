const express = require("express");
const path = require("path");

const app = require("./src/app");
const productDB = require("./config/productDB");

// 🔥 STATIC FILES (RIGHT PLACE)
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

productDB();

app.listen(3000, () => {
  console.log("Server is running");
});
