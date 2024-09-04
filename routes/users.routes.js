const userController = require("../controllers/users.controller");

const express = require("express");
const router = express.Router();
const User = require("../models/users");


router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/forget-password", userController.resetpass);




module.exports = router;