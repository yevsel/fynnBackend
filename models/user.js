const mongoose = require("mongoose");

const user = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    secondName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    access_token:{
        type:String,
    }
})

module.exports = mongoose.model("userModel",user)