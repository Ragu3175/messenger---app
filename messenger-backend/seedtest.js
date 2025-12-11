require('dotenv').config();

const mongoose = require("mongoose")
const bcrypt = require('bcrypt')

const Users = require('./model/Signupmodel')
const messgages =require('./model/Messagemodel');
const { text } = require('express');

const seedtest = async() =>{
    try{
        const testDb = process.env.TEST_DB
        if(!testDb){
            console.error("cannot connect to testDb")
            process.exit(1);
        }
        console.log("connecting to test db...")
        await mongoose.connect(testDb)
        console.log("connected to test DB")
        
        await Users.deleteMany({});
        await messgages.deleteMany({});

        console.log("all the users in testDb are deleted")

        const hashed1 = await bcrypt.hash("password123",10);
        const hashed2 = await bcrypt.hash("password321",10);

        const user1 = await Users.create({
            username:"Testuser1",
            phone:"9000000001",
            password:hashed1,
            contact:[
                {name:"Testuser2",phone:"9000000002"}
            ]
        });
        const user2 = await Users.create({
            username:"Testuser2",
            phone:"9000000002",
            password:hashed2,
            contact:[
                {name:"testuser1",phone:"9000000001"}
            ]
        }) ;
        console.log("users are created",user1.phone,user2.phone);

        await messgages.create([
            {
                from:user1.phone,
                to:user2.phone,
                text:"hellow user2"
            },
            {
                from:user2.phone,
                to:user1.phone,
                text:"hellow user1"
            }
        ]);
        console.log("messages are created")
        console.log("seedtest is completed successfully");
        process.exit(0);

    }catch(err){
        console.error("something is wrong in seedtest",err);
        process.exit(1);
    }
}