const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const app=express();
const http = require("http");
const {Server} = require("socket.io");
const jwt = require("jsonwebtoken");


const connectDb = require('./config/dbconfig');

connectDb();

app.use(cors());
app.use(express.json());



app.get("/",(req,res) => {
    res.send("App is running");
})


const signup = require("./routes/Signuproute");
app.use("/api/signup",signup);

const savesContacts = require("./routes/contactRoute");
app.use("/api/savedcontact",savesContacts);


const { Socket } = require("dgram");

const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        method:["GET","POST"]
    }
});

io.use((socket,next) => {
    const token = socket.handshake.auth.token;
    if(!token) {
        return next(new Error("no token is provided"));
    }
    try{
        const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        socket.user = decoded.user;
        next();
    }catch(err){
        return next(new Error("tokens are invalid in socket",err))
    }
});

const onlineUser = {};

io.on("connection",(socket) => {
    const user = socket.user;
    onlineUser[user.phone] = socket.id;
    console.log(`${user.username} connected [${socket.id}]`);

    socket.emit("current-user",{
        phone:user.phone,
        username:user.username
    })

    socket.on("private-message",({toPhone,text}) => {
        const targetSocketId = onlineUser[toPhone];
        if(targetSocketId){
            io.to(targetSocketId).emit("received-message",{
                from: user.phone,
                fromusername:user.username,
                text,
            })
            console.log(`${user.username} ${toPhone} : ${text}`)
        }else{
            console.log(` user ${toPhone} is offline`)
        }
    })
    socket.on("disconnect",() => {
        console.log(`${user.username} disconnected`)
        delete onlineUser[user.phone]
    })
})

const PORT = process.env.PORT || 5001;
server.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
})

