const reviewController = require("../controllers/reviews.controller");
const express = require("express");
const router = express.Router();

 
router.post("/createreview", reviewController.createreview); 
router.post("/getallreview", reviewController.getallreview);

router.post('/checkstatus', reviewController.checkstatus);

module.exports = router;    