const Order = require("../models/orders"); 
const Cart = require("../models/carts"); 
const Product = require("../models/products"); 


exports.createorder = async (req, res, next) => {
    const { user, productItem, address, phone, delivery } = req.body;

    try {
        // Tính tổng tiền của đơn hàng
        const totalOrder = productItem.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
        

        // Tạo đơn hàng mới
        const newOrder = new Order({
            user: user,
            productItem: productItem,
            total: totalOrder,
            address: address,
            phone: phone,
            delivery: delivery
        });


        // Lưu đơn hàng vào database
        await newOrder.save();
        // Tìm giỏ hàng của người dùng
        const findCart = await Cart.findOne({ user: user });
        const productIds = req.body.productItem.map((productItem) => ({ product: productItem.product }));
        console.log(productIds);
        const updateCart = await Cart.findOneAndUpdate(
            { user: user },
            {
              $pull: { productItem: { product: { $in: productIds.map(item => item.product) } } }
            },
            { new: true }
          );
          


        // Tính tổng mới cho giỏ hàng
        const newTotal = updateCart.productItem.reduce((acc, cur) => acc + (cur.price * cur.quantity), 0); // Tính tổng mới
        updateCart.total = newTotal; // Cập nhật tổng giỏ hàng
        await updateCart.save(); // Lưu giỏ hàng sau khi cập nhật

        // Phản hồi thành công
        return res.status(201).json({
            success: true,
            message: "Order created and cart updated successfully",
        });
    } catch (error) {
        next(error);
    }
};



exports.getorder = async (req, res, next) => {
    const { user } = req.body;

    try {
        const listOrder = await Order.find({user : user }).select('-__v -updatedAt');

        return res.status(201).json({
            success: true,
            message: "Thành công",
            data: listOrder
        });
    } catch (error) {
        next(error);
    }
};


exports.getallorder = async (req, res, next) => {
    try {
        // Lấy tất cả đơn hàng và populate thông tin sản phẩm và người dùng
        const listOrder = await Order.find()
            .populate('user', 'email _id') // populate chỉ lấy email từ user
            .populate('productItem.product', 'name price images') // populate thông tin sản phẩm (name, price, images)
            .select('-__v -updatedAt -createdAt'); // Loại bỏ các trường không cần thiết như __v, updatedAt, createdAt

        // Loại bỏ trường 'id' trong phần thông tin user và điều chỉnh dữ liệu trả về
        const formattedOrders = listOrder.map(order => {
            return {
                _id: order._id,
                email: order.user.email, // Chỉ lấy email từ user
                iduser: order.user.id,
                productItem: order.productItem.map(item => ({
                    productId: item.product._id, // Đổi tên trường 'product' thành 'productId'
                    name: item.name,
                    quantity: item.quantity,
                    images: item.images,
                    price: item.price
                })),
                total: order.total,
                address: order.address,
                phone: order.phone,
                delivery: order.delivery,
                setCoupon: order.setCoupon
            };
        });

        return res.status(200).json({
            success: true,
            message: "Thành công",
            data: formattedOrders
        });
    } catch (error) {
        next(error);
    }
};
