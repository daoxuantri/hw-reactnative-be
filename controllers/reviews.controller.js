const Review = require("../models/reviews"); 
const Order = require("../models/orders"); 
const Product = require("../models/products"); 


 
exports.createreview = async (req, res, next) => {
    try {
        const { userId, productId, content, rating } = req.body;
    
        // 1. Tìm các đơn hàng của người dùng với sản phẩm đó
        const order = await Order.findOne({
          user: userId,
          "productItem.product": productId,
        });
    
        // 2. Kiểm tra nếu không có đơn hàng
        if (!order) {
          return res.status(200).json({ success: false ,message: "Chưa mua sản phẩm nên chưa được bình luận" });
        }
    
        // 3. Kiểm tra trạng thái giao hàng
        if (order.delivery !== true) {
          return res.status(200).json({ success: false , message: "Sản phẩm chưa được giao, không thể bình luận." });
        }
    
        // 4. Thực hiện việc tạo bình luận
        const newReview = new Review({
          user: userId,
          product: productId,
          content,
          rating,
        });
    
        await newReview.save();
    
        // // 5. Cập nhật điểm đánh giá trung bình của sản phẩm
        // const product = await Product.findById(productId);
        // const reviews = await Review.find({ product: productId });
        // const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
    
        // product.rating = averageRating;
        // await product.save();
    
        return res.status(200).json({ success : true , delivery: true , message: "Đã thêm bình luận thành công." });
      } catch (error) {
        next(error);
      }
};

exports.getallreview = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const reviews = await Review.find({ product: productId })
      .populate("user", "email")
      .select("user product content rating");

    return res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};

exports.checkstatus = async (req, res, next) => {
  const { userId, productId } = req.body;
  try {
    const order = await Order.findOne({
      user: userId,
      "productItem.product": productId,
    });

    if (!order) {
      return res.status(200).json({ canComment: false });
    }

    // Kiểm tra trạng thái giao hàng
    const canComment = order.delivery === true;

    return res.status(200).json({ canComment });
  } catch (error) {
    next(error)
  }
};
