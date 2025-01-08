require("dotenv").config();
const express = require("express");
const { connectDB } = require("./config/db");

const app = express();
const PORT = process.env.PORT || 3000;

//Connect to the database
// connectDB();

//middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "API is running...",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
