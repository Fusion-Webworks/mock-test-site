const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const userModel = require("../models/userModel");
const verifyToken = require('../middlewares/auth.js');

// Zod schema for validating user input
const registerSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  password: z.string().min(6),
  user: z.enum(["admin", "user", "guest"]),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const authController = {
  // Register a new user
  async register(req, res) {
    try {
      // Validate request body using Zod
      const validatedData = registerSchema.parse(req.body);

      // Check if the user already exists
      const existingUser = await userModel.findOne({ email: validatedData.email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash password using bcrypt
      const hashedPassword = await bcrypt.hash(validatedData.password, 10);

      // Create a new user
      const newUser = new userModel({
        email: validatedData.email,
        name: validatedData.name,
        password: hashedPassword,
        user: validatedData.user,
      });

      // Save user to the database
      await newUser.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Registration error:", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  // Login an existing user
  async login(req, res) {
    try {
      // Validate request body using Zod
      const validatedData = loginSchema.parse(req.body);

      // Find the user by email
      const user = await userModel.findOne({ email: validatedData.email });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Compare passwords using bcrypt
      const isMatch = await bcrypt.compare(validatedData.password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Generate a JWT token
      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.user }, // Including user role
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      // Send the token in the response
      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      console.error("Login error:", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  // Profile route - accessible only for authenticated users
  async profile(req, res) {
    try {
      const user = await userModel.findById(req.user.id); // Get user details based on the token
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ user });
    } catch (error) {
      console.error("Profile error:", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },
};

module.exports = authController;
