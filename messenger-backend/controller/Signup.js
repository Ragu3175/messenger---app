const Signup = require("../model/Signupmodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const client = require("twilio")(process.env.TWILIO_SID, process.env.TWILIO_AUTH);
const adduser = async(req,res) => {
    try{
        const {username,phone,password} = req.body;
        const existuser = await Signup.findOne({phone});
        if(existuser){
            return res.status(400).json({message:"phone number alreaddy exist"});
        }
        const hashedpassword = await bcrypt.hash(password,10);
        // const otp = await Math.floor(10000+Math.random()*90000).toString();
        // const otpHash = await bcrypt.hash(otp,10);
        // const otpExpiry =  new Date(Date.now()+2*60*1000)
        // await client.messages.create({
        //     body: `Your OTP is ${otp}`,
        //     from: process.env.TWILIO_PHONE,
        //     to: phone
        // });
        const user = await Signup.create({
            username,
            phone,
            password:hashedpassword,
            // otpHash,
            // otpExpiry
        })
        res.status(201).json({message:"user is  created",user});
    }catch(err){
        res.status(500).json({message:"server error"});
    }
}

// const otpVerification = async(req,res) => {
//     try{
//         const {phone,otp} = req.body;
//         const user = await Signup.findOne({phone});
//         if(!user) return res.status(400).json({message:"user is not exist"});
//         if( user.otpExpiry < new Date()) return res.status(400).json({message:"otp Expires"});
//         const valid = await bcrypt.compare(otp,user.otpHash);
//         if(!valid) return res.status(400).json({message:"invalid OTP"});
//         user.isVerified = true;
//         user.otpHash = undefined;
//         user.otpExpiry = undefined;
//         await user.save();
//         res.status(201).json({message:"otp verification Succesfull"});
//     }catch(err){
//         res.status(500).json({message:"server error while verify OTP"})
//     }
// }

const loginuser = async(req,res) => {
    try{
        const {phone,password} = req.body;
        const existuser = await Signup.findOne({phone})
        if(!existuser){
            return res.status(401).json({message:"the phone numbber is not exists"})
        }
        const ishashedpass = await bcrypt.compare(password,existuser.password)
        if(!ishashedpass){
            return res.status(401).json({message:"incorrect password"});
        }
        const accesstoken = jwt.sign({
            user:{
                username:existuser.username,
                phone:existuser.phone,
                password:existuser.password
            }
        },process.env.ACCESS_TOKEN_SECRET,{expiresIn: "1h"});
        res.status(200).json({message:"login succesfull",accesstoken})
    }catch(err){
        res.status(500).json({message:"server error"})
    }
}

const getAllUser = async(req,res) => {
    try{
        const getallUser = await Signup.findAll({});
        res.status(201).json({message:"all users data",getAllUser})
    }catch(err){
        res.status(500).json({message:"server error while get all user"})
    }
}

const currentuser = async(req,res) => {
    try{
        res.json(req.user);
    }catch(err){
        res.status(500).json({message:"server error while get all user"})
    }
}

module.exports = {adduser,loginuser,currentuser,getAllUser};