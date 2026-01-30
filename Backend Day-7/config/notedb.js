const mongoose = require("mongoose");
require('dotenv').config();
const DB_URI = process.env.MONGODB_URI;

const connectTodb = async () => {
  try {
    if (!DB_URI) {
      throw new Error("MONGODB_URI is not defined in .env file");
    }
    await mongoose.connect(
      DB_URI
    );
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB error:", err.message);
  }
};

module.exports = connectTodb;