const mongoose = require("mongoose");
const {Schema} = mongoose;

const productSchema = new Schema ({
    nameproduct:{
        type: String,
        trim : true ,
        required: true,
        
    },
    imgs:{
        type: String,
        required: true,

    },
    price:{
        type: Number,
        trim: true,
    },
},{ timestamps: true }
);


const Product = mongoose.model("Product",productSchema);
module.exports= Product    