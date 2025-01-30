require("dotenv").config();
const express = require("express");
const { connectDB } = require("./config/db");
const cors = require("cors");
const authRoutes = require("./routers/auth.routes");
const textRoutes = require("./routers/text.routes");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://mock-test-site-frontend.vercel.app",
      "https://mocktest-backend-ho52.onrender.com",
    ], // Allow frontend and backend origins
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow necessary HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow required headers
    credentials: true, // Allow credentials if needed (JWT, Cookies, etc.)
  })
);
// Handle preflight requests manually
app.options("*", cors()); // Allow preflight requests for all routes

// Admin auth route
app.use("/api/v1/auth", authRoutes);

// Admin text route
app.use("/api/v1/adminText", textRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "API is running...",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
