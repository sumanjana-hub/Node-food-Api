const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: [true,"username is required"]
    },
    email:{
        type:String,
        required: [true,"email is required"],
        unique: true
    },
    password:{
        type:String,
        required: [true,"password is required"]
    },
    address:{
        type:Array
    },
    phone:{
        type: String,
        required: [true,"phone is required"]
    },
    usertype:{
        type: String,
        required: [true,"usertype is required"],
        default: 'clinet',
        enum:['clinet','admin','vendor','driver']
    },
    profile:{
        type: String,
        default:"https://th.bing.com/th/id/OIP.tvaMwK3QuFxhTYg4PSNNVAHaHa?w=212&h=213&c=7&r=0&o=5&pid=1.7"
    },
    answer:{
        type: String,
        required: [true,"answer is required"]
    }
},{timestamps:true})

 module.exports = mongoose.model('User',userSchema)