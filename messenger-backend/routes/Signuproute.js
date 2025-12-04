const express = require('express');
const router = express.Router();
const validToken  = require('../middleware/Validtoken');
const {adduser,loginuser,currentuser,getAllUser} = require('../controller/Signup');

router.post("/",adduser);

router.post("/login",loginuser);

router.get("/currentuser",validToken,currentuser);

router.get("/alluserdata",getAllUser);

// router.post("/otpverification",otpVerification)

module.exports = router;