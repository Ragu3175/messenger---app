const { text } = require("express");
const mongoose = require("mongoose");


const messageModel = mongoose.Schema({
    from:{type:String,required:true},
    to:{type:String,required:true},
    text:{type:String,required:true},
    timestamps:{type:Date,default:Date.now}
},{
    timestamps:true
});

module.exports=mongoose.model("messageHistory",messageModel);