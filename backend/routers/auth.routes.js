const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth");
const authController = require("../controllers/auth.controller");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get('/profile/:_id', verifyToken, authController.profile); 


module.exports = router;
