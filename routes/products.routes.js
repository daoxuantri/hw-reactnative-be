const productController = require("../controllers/products.controller");

const express = require("express");
const router = express.Router();
const uploadCloud = require("../middlewares/multer");
const auth = require("../middlewares/auth");
// router.post("/register", brandController.register);
// router.post("/login", brandController.login);
router.post("/createproduct",uploadCloud.array('images'), productController.createProduct);
router.get("/listallproduct", productController.listallproduct);

router.get("/getselling", productController.getselling);

//flutter
router.get("/homeflutter",  productController.getallflutter);
router.get("/:productId",  productController.getproductbyid);
module.exports = router;    