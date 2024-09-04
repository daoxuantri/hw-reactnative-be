const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new Schema ({
    username:{
        type: String,
        trim : true ,
        
    },
    password:{
        type: String,
        required: true,
        trim: true ,

    }
},{ timestamps: true }
);


const User = mongoose.model("User",userSchema);
module.exports= User    