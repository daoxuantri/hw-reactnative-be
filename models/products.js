const mongoose = require("mongoose");
const {Schema} = mongoose;
const productSchema = new Schema ({
    name: {
        type : String,
        required : true
    },
    images:{
        type: String,
        required: true
    },
    description: {
        type : String
    },
    price: {
        type : Number,
    },
    rating: {
        type : Number,
        default: 0 ,
    },
    sold: {
        type : Number,
        default: 0 ,
    },

},{ timestamps: true }
);

const Product = mongoose.model("Product",productSchema);

module.exports= Product;