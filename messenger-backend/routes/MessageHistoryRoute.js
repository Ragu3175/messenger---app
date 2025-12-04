const express = require('express');
const router = express.Router();
const {storeChats,getAllChats} = require("../controller/MessageController")
const validToken = require("../middleware/Validtoken");


router.post("/send",validToken,storeChats);

router.get("/history/:phone",validToken,getAllChats);

module.exports=router;