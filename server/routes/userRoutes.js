const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const { requireAuth, checkUser } = require("../middleware/authMiddleware");

router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router