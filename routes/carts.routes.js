const cartController = require("../controllers/carts.controller");

const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

//duoc tao sau khi nguoi dung login lan dau tien vao
router.post("/createcart", cartController.createcart); 
router.post("/getcartbyuser", cartController.getcartbyuser);
router.post("/addproduct", cartController.addproduct); 
router.post("/removeproduct", cartController.removeproduct);

module.exports = router;    