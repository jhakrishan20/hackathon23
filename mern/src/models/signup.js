const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullname : {
        type:String,
        required:true
    },
    phone : {
        type:Number,
        required:true
    },
    email : {
        type:String,
        required:true,
        unique:true
    },
    password : {
        type:String,
        required:true
    },
    gender : {
        type:String,
        required:true
    }
})

const Signup = new mongoose.model("Signup" ,userSchema );

module.exports = Signup;