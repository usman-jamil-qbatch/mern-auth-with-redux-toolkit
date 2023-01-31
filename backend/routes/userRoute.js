const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.post("/login", userController.signIn);
router.post("/register", userController.createUser);
module.exports = router;
