const mongoose = require("mongoose");


async function connectDB() {
  try {
    await mongoose.connect("mongodb+srv://leeladharupadhayay7:test123@cluster0.5zor9.mongodb.net/mocktest?retryWrites=true&w=majority&appName=Cluster0");
    //database connection
    console.log("MongoDB is connected successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
}

module.exports = { connectDB };
