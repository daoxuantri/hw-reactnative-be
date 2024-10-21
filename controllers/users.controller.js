const bcryptjs =require("bcryptjs");
const User = require("../models/users");
const Cart = require("../models/carts"); 
const Coupon = require("../models/coupons"); 
const auth = require("../middlewares/auth");


exports.register = async (req, res, next) => {
    try {
        const {email, password, contact, address} = req.body;

        const salt = bcryptjs.genSaltSync(10);

        req.body.password = bcryptjs.hashSync(password, salt);

        
        const emails = await User.findOne({ email });

        if (emails) {
            return res.status(201).send({
                success: false,
                message: "Email đã tồn tại vui lòng đăng kí mới"
            })
        };

        const newUser = new User({
            email: email,
            password: req.body.password,
            contact: contact,
            address:address
        });
        const saveUser = await newUser.save();
        if (!saveUser) {
            return res.status(201).send({
                success: false,
                message: "Đăng Ký User Mới Không Thành Công!"
            });
        } 
        
        //create cart
        const findUser = await User.findOne({email: email});
 
        const newCart = new Cart({user : findUser._id});

        const createCart = await newCart.save();

        //create coupon 

        const newCoupon = new Coupon({user: findUser._id});
        const createCoupon = await newCoupon.save();

        
        return res.status(200).send({success: true , message :"Thanh cong"});
    } catch (err) {
        next(err);
    }
};


exports.login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        
        const resultUser = await User.findOne({email});
        if (!resultUser) {
            return res.status(201).send({
                success: false,
                message: "Thông tin đăng nhập không đúng"
            });
        }

        const isCorrectPassword = bcryptjs.compareSync(req.body.password, resultUser.password);
        console.log(isCorrectPassword)
        if (!isCorrectPassword) return res.status(201).send({
            success: false,
            message: "Sai mật khẩu!"
        });

        if (isCorrectPassword && resultUser){
            const access_token = auth.generateAccessToken(resultUser._id); 
            // const { password, createdAt, updatedAt, _v , role , ...others} = resultUser._doc;
            return res.status(200).json({ 
                success: true, 
                data: {
                    ...resultUser.toJSON(),
                    access_token: access_token,
                },

            });
            
        }

            
    } catch (err) {
        return next(err);
    }
};


exports.resetpass = async (req, res, next) => {
    try {
        const {email, password} = req.body;


        //hashSync
        const salt = bcryptjs.genSaltSync(10);
        req.body.password = bcryptjs.hashSync(password, salt);

        const saveUser = await User.findOneAndUpdate(
            {email: email},
            {password: req.body.password},
            { new: true }
        )
        return res.status(200).json({
            success : true,
            message: "Cập nhật mật khẩu thành công."
        })

            
    } catch (err) {
        return next(err);
    }
};

exports.updateinfo = async (req, res, next) => {

    try{
        const {_id , email , contact , address} = req.body; 
        const updatedUser = await User.findByIdAndUpdate(
                req.body._id,
                {
                    contact: req.body.contact,
                    address: req.body.address,
                },
                { new: true }
            )
            return res.status(200).json({
                success: true,
                message: "Thành công"});

    }catch(err){
        return next(err); 
    }
    
};



