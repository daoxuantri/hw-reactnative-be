const orderController = require("../controllers/orders.controller");

const express = require("express");
const router = express.Router();


router.post("/createorder", orderController.createorder); 
router.post("/getorder", orderController.getorder); 
router.get("/getallorder", orderController.getallorder); 
module.exports = router;    