const mongoose = require("mongoose");

const DB_URI = process.env.DB_URI;

async function connectDB() {
  try {
    await mongoose.connect(DB_URI);
    //database connection
    console.log("MongoDB is connected successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
}

module.exports = { connectDB };
