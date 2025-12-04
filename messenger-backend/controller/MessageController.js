const messageHistory = require('../model/Messagemodel');

const storeChats = async(req,res) => {
    try{
        const {to ,text} = req.body
        const newMsg = await messageHistory.create({
            from:req.user.phone,
            to,
            text
        });

        res.status(201).json({message:"message stored succesfully",data:newMsg})
    }catch(err){
        res.status(500).json({message:"server error while saving chats in DB"})
    }
}

const getAllChats = async(req,res) => {
    try{
        const user1 = req.user.phone;
       
        const user2 = req.params.phone;
        const chats = await messageHistory.find({
            $or:[
                {from:user1,to:user2},
                {from:user2,to:user1}
            ]
        }).sort({timestamps:1});
        res.status(201).json(chats)

    }catch(err){
        res.status(500).json({message:"server error while geting all chats"})
    }
}

module.exports={storeChats,getAllChats};