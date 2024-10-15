const couponController = require("../controllers/coupon.controller");

const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

//duoc tao sau khi nguoi dung login lan dau tien vao
router.post("/tichdiem", couponController.tichdiem); 
module.exports = router;    