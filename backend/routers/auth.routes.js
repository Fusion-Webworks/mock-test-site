const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth");
const authController = require("../controllers/auth.controller");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get('/profile', verifyToken, authController.profile); 
// router.post("/logout", logout);

module.exports = router;
