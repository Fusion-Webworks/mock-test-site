require("dotenv").config();
const express = require("express");
const { connectDB } = require("./config/db");
const cors = require("cors");
const authRoutes = require("./routers/auth.routes");
const textRoutes = require("./routers/text.routes");

const app = express();
const PORT = process.env.PORT || 3000;

//Connect to the database
connectDB();

//middleware
app.use(express.json());
app.use(cors());

//admin auth route
app.use("/api/v1/auth" , authRoutes);

//admin text route
app.use("/api/v1/adminText" , textRoutes);



app.get("/", (req, res) => {
  res.json({
    message: "API is running...",
  });
});



app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
