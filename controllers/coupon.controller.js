const Coupon = require("../models/coupons"); 
const Order = require("../models/orders");
const Product = require("../models/products")




//admin set trang thai don hang xong tich diem
exports.tichdiem = async (req, res, next) => {
    const { user, order, delivery } = req.body;

    try {
        let updatedOrder;

        // Update order if delivery is true, otherwise find the order
        if (delivery) {
            updatedOrder = await Order.findByIdAndUpdate(
                order,
                { delivery: delivery },
                { new: true }
            );
        } else {
            updatedOrder = await Order.findById(order);
        }

        // Check if the order exists
        if (!updatedOrder) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }
        


        if(updatedOrder.setCoupon == 1){
            // tinh total de lay do lam diem cho coupon
        const totalorder = updatedOrder.total / 1000;

        // Find user
            let findUser = await Coupon.findOne({ user: user });
        
            // Update the coupon total for the existing user
            const totaltichdiem = findUser.total + totalorder;

            await Coupon.findOneAndUpdate(
                { user: user },
                { total: totaltichdiem },
                { new: true }
            );

            //set trang thai don hang da tich diem
            await Order.findOneAndUpdate(
                { _id: order },
                { setCoupon: 0},
                { new: true }
            );

            console.log

            for (const item of updatedOrder.productItem) {
                await Product.findByIdAndUpdate(
                    item.product,
                    { $inc: { sold: item.quantity } }, 
                    { new: true }
                );
            }

            


        }else{
            return res.status(200).json({
                success: true , 
                message :"đơn hàng đã được tích điểm rồi"}
            )
        }

        return res.status(201).json({
            success: true,
            message: "Tích điểm thành công",
        });
    } catch (error) {
        next(error);
    }
};
