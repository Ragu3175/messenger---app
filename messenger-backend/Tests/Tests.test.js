const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose')
require("dotenv").config();  

beforeAll(async () => {
    await mongoose.connect(process.env.CONNECTION_STRING);
});

const random = Math.floor(Math.random() * 100000);

describe('POST api/signup' , () => {
    it('it should return 201',async() => {
        const res = await request(app).post('/api/signup').send({
            username:"testuser"+random,
            phone:"4567"+random,
            password:"4567"+random
        });
        expect(res.statusCode).toBe(201)
    })
})

afterAll(async() => {
    await mongoose.connection.close();
    // await server.close();
})