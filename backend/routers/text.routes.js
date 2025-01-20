const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth");
const adminTextController = require("../controllers/adminText.controller");

// Route for adding text (protected, only admin can add text)
router.post("/add", verifyToken, (req, res) => {
    console.log("Request received at /add route");6
    console.log(req.user.user, "this is role of user");
    
    if (req.user.user !== "admin") {
        return res.status(403).json({ message: "Forbidden. Admin access only." });
    }

    // Call the controller to handle the logic for adding text
    adminTextController.addText(req, res);
});

// Route for viewing text by ID (public or protected, depends on your requirement)
router.get("/view", (req, res) => {
    // You can make this route public or protect it with a middleware if needed
    adminTextController.viewText(req, res);
});

module.exports = router;
