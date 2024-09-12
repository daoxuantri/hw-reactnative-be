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
        const {nameproduct, imgs, price} = req.body;
        const newProduct = new Product({
            nameproduct: nameproduct,
            imgs : imgs ,
            price: price
        })

        const save = await newProduct.save();
        if (!save) {
            return res.status(201).send({
                success: false,
                message: "Đăng Ký Product Mới Không Thành Công!"
            });
        }
        return res.status(200).send({success: true , message :"Thanh cong"});

    }catch(err) {
        next(err);
    }

 }



