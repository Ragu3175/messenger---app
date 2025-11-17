const Signup = require("../model/Signupmodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const adduser = async(req,res) => {
    try{
        const {username,phone,password} = req.body;
        const existuser = await Signup.findOne({phone});
        if(existuser){
            return res.status(400).json({message:"phone number alreaddy exist"});
        }
        const hashedpassword = await bcrypt.hash(password,10);
        const user = await Signup.create({
            username,
            phone,
            password:hashedpassword
        })
        res.status(201).json({message:"user is  created",user});
    }catch(err){
        res.status(500).json({message:"server error"});
    }
}

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