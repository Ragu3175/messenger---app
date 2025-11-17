const User = require("../model/Signupmodel");

const contactController = async(req,res) => {
    try{
        const { contactName,contactNumber} = req.body;
        const currentUser = await User.findOne({phone:req.user.phone});
        if(!currentUser){
            return res.Status(401).json({message:"Logged in user not found"})
        }
        const contactUser = await User.findOne({phone:contactNumber});
        if(!contactUser){
            return res.Status(404).json({message:"The user is not exist in DB"})
        }
        const existInContact = await currentUser.contact?.some((c) => c.phone === contactNumber);
        if(existInContact){
            return res.status(400).json({message:"user is already in contact"})
        }
        await currentUser.contact.push({name:contactName,phone:contactNumber});
        await currentUser.save();
        res.status(200).json({message:"contact saves succesfully"})
        
    }catch(err) {
        res.status(500).json({messager:"Server error in contact controller"})
    }
}

const getAllContacts = async(req,res) => {
    try{
        const currentUser = await User.findOne({phone : req.user.phone});
        if(!currentUser){
            return res.status(401).json({message:"Logged in user does not exist"})
        }
        
        res.status(201).json({contact:currentUser.contact || []});
    }catch(err){
        res.status(500).json({message:"server error while get all contacts"});
    }
}

module.exports = {contactController,getAllContacts}