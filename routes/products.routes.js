const productController = require("../controllers/products.controller");

const express = require("express");
const router = express.Router();

// router.post("/register", brandController.register);
// router.post("/login", brandController.login);

router.get("/listallproduct", productController.listallproduct);
router.post("/createproduct", productController.createProduct);
module.exports = router;    