const mongoose = require("mongoose");
const {Schema} = mongoose;
const orderSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User"
    },
    productItem: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                require: true,
                ref: "Product"
            },
            name: { type: String, require: true },
            quantity: { type: Number, require: true },
            images: { type: String, require: false },
            price: { type: Number, require: true },
        }
    ],
    total: {
        type: Number,
        required: true,
        default: 0.0
    },
    address: {
        type: String,
        trim : true
    },
    phone:{
        type: String,
        trim: true 
    },
    delivery:{
        type: Boolean,
        default: false
    }
},
    { timestamps: true }
)
const Order = mongoose.model("Order",orderSchema);
module.exports= Order;