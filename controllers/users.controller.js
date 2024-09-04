const bcryptjs =require("bcryptjs");
const User = require("../models/users");

const auth = require("../middlewares/auth");


exports.register = async (req, res, next) => {
    try {
        const {username, password} = req.body;

        const salt = bcryptjs.genSaltSync(10);

        req.body.password = bcryptjs.hashSync(password, salt);

        
        const usernames = await User.findOne({ username });

        if (usernames) {
            return res.status(201).send({
                success: false,
                message: "Email đã tồn tại vui lòng đăng kí mới"
            })
        };

        const newUser = new User({
            username: username,
            password: req.body.password
        });
        const saveUser = await newUser.save();
        if (!saveUser) {
            return res.status(201).send({
                success: false,
                message: "Đăng Ký User Mới Không Thành Công!"
            });
        }
        return res.status(200).send({success: true , message :"Thanh cong"});
    } catch (err) {
        next(err);
    }
};


exports.login = async (req, res, next) => {
    try {
        const {username, password} = req.body;
        
        const resultUser = await User.findOne({username});
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
            return res.status(200).json({ 
                success: true, 

            });
            
        }

            
    } catch (err) {
        return next(err);
    }
};


exports.resetpass = async (req, res, next) => {
    try {
        const {username, password} = req.body;


        //hashSync
        const salt = bcryptjs.genSaltSync(10);
        req.body.password = bcryptjs.hashSync(password, salt);

        const saveUser = await User.findOneAndUpdate(
            {username: username},
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


