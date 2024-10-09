const orderController = require("../controllers/orders.controller");

const express = require("express");
const router = express.Router();


router.post("/createorder", orderController.createorder); 
router.post("/getorder", orderController.getorder); 
module.exports = router;    