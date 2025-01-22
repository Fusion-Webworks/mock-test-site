const textModel = require("../models/textModel");

const adminTextController = {
  // Method for adding text (only admin can create text)
  async addText(req, res) {
    try {
      // Log request body for debugging
      console.log("Request body:", req.body);
  
      // Ensure the user is an admin
      if (req.user.user !== "admin") {
        return res.status(403).json({
          message: "Permission denied. Only admins can create text entries.",
        });
      }
  
      // Validate that the title field is present
      if (!req.body.title) {
        return res.status(400).json({ message: "Title is required." });
      }
  
      // Create a new text entry
      const newText = new textModel({
        title: req.body.title, // Directly use 'title' from the request
        subtitle: req.body.subtitle,
        textArea: req.body.textArea,
        id: req.user.id, // Authenticated user's ID
      });
  
      // Save the text entry
      await newText.save();
  
      console.log("Text entry created successfully.");
      res.status(201).json({
        message: "Text entry created successfully.",
        text: newText,
      });
    } catch (error) {
      console.error("Error occurred while creating the text entry:", error.message);
      res.status(500).json({
        message: "An error occurred while creating the text entry.",
        error: error.message,
      });
    }
  },
  

  // Method for viewing text by ID
  async viewText(req, res) {
    try {
      // const { _id } = req.params;

      // Find the text entry by ID and populate the 'id' field with user data
      const text = await textModel.find();
      if (!text) {
        return res.status(404).json({ message: "Text entry not found." });
      }

      res.status(200).json({ text });
    } catch (error) {
      console.error(
        "An error occurred while viewing the text entry:",
        error.message
      );
      res.status(500).json({
        message: "An error occurred while viewing the text entry.",
        error: error.message,
      });
    }
  },
};

module.exports = adminTextController;
