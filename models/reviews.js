const mongoose = require("mongoose");
const {Schema} = mongoose;

const reviewSchema = new Schema ({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      content: { 
        type: String,
        trim: true,
      },
      rating: {
        type: Number,
        default: 1 ,
        min: 1, 
        max: 5, 
      },
    
},{ timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review ;