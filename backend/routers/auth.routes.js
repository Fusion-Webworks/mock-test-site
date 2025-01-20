const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth");
const authController = require("../controllers/auth.controller");

router.post("/register", authController.register);
router.post("/login", authController.login);
<<<<<<< HEAD
router.get("/login", authController.login);
router.get('/profile', verifyToken, authController.profile); 
// router.post("/logout", logout);
=======
router.get('/profile/:_id', verifyToken, authController.profile); 

>>>>>>> 86e34f560cbd3401c78b3053e83defcca35f8d00

module.exports = router;
