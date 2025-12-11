const express = require("express");
const cors = require("cors");



const app=express();
app.use(cors());
app.use(express.json());



app.get("/",(req,res) => {
    res.send("App is running");
})


const signup = require("./routes/Signuproute");
app.use("/api/signup",signup);

const savesContacts = require("./routes/contactRoute");
app.use("/api/savedcontact",savesContacts);

const messagehistory = require("./routes/MessageHistoryRoute")
app.use("/api/message",messagehistory);

module.exports=app