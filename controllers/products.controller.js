const createError = require("../middlewares/error");
const Product = require("../models/products");
const cloudinary = require('cloudinary').v2;
const mongoose = require("mongoose");


exports.listallproduct = async (req, res, next) => {
    try {
        const listProduct = await Product.find().select('-__v -createdAt -updatedAt');
            
            return res.status(200).send({
                success: true,
                message: "Thành công",
                data: listProduct,
            });
        } catch (err) {
            next(err);
    }
    
    
};

exports.createProduct = async (req,res,next)=>{
    try{
        console.log(req.body);
        req.body.images = req.files[0].path;
        const {name,description, price} = req.body;

        const newProduct = new Product({
            name:  name,
            images: req.body.images,
            description:  description,
            price:  price
        })

        const save = await newProduct.save();
        if (!save) {
            return res.status(404).send({
                success: false,
                message: "Đăng Ký Product Mới Không Thành Công!"
            });
        }
        return res.status(200).send({success: true , message :"Thanh cong"});

    }catch(err) {
        next(err);
    }

 }



 exports.getselling = async (req, res, next) => {
    try {
        const topSellingProducts = await Product.find() 
          .sort({ selling: -1 })
          .limit(10) 
          .exec(); 
    
        return res.status(200).send({
            success: true , 
            data: topSellingProducts
        });;
      } catch (err) {
        next(err); 
      }
    };

exports.getallflutter = async (req, res, next) => {
    try { 
        const listProduct = await Product.find().select('-__v -createdAt -updatedAt');
        const topSellingProducts = await Product.find().select('-__v -createdAt -updatedAt')
        .sort({ selling: -1 })
        .limit(10) 
        .exec(); 

        return res.status(200).send({
            success: true,
            message: "Thành công",
            data: {
                products: listProduct,
                rating: topSellingProducts
            }
        });
    } catch (err) {
        next(err);
    }
};

exports.getproductbyid = async (req, res, next) => {
    try {
        const _id = req.query.productId;
        const foundId = await Product.find({_id : _id}).select('-__v -createdAt -updatedAt');
        if(!foundId){
            return res.status(404).send({
                success: false,
                message: "Không tìm thấy sp"
            })
        }
        return res.status(201).send({
            success: true,
            message: "Thành công",
            data: foundId
        })
    } catch (err) {
        return next(err);
    }
};
    


