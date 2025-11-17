const mongoose = require("mongoose");

const constactSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true]
    },
    phone:{
        type:String,
        required:[true]
    },
    
},{_id:false})

const signupuser = mongoose.Schema({
    username:{
        type:String,
        required:[true]
    },
    phone:{
        type:String,
        required:[true],
        unique:[true]
    },
    password:{
        type:String,
        required:[true]
    },
    contact:[constactSchema]
},{
    timestamps:true,
})

module.exports = mongoose.model("signupuser",signupuser);