const express = require("express")
const cors = require("cors");
const mongoose = require('mongoose')
const userModel = require("./models/user")
const bodyParser = require("body-parser")
// const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require("dotenv").config()


const app = express()

// Middlewares
app.use(express.json())
// app.use(bodyParser({extended:urlencoded}))
app.use(cors({
    origin:"*"
}))


// Routes
app.post("/create_account",async (req,res)=>{
    //Check if user exist already
    const {firstName,secondName,email,password} = req.body
    const result = await userModel.findOne({email})
    if(result) return res.json({message:"user already exists"})

    //Create account for the user
    //Hash the password first
    const hashedPassword = await bcrypt.hash(password,10);
    const dataFromDB = await userModel.create({
        firstName,
        secondName,
        email,
        password:hashedPassword
    })
    console.log(dataFromDB)
    res.json({message:"Account created"})
})


// Login
app.post("/login",async(req,res)=>{
    //Check if user exist already
    const {email,password} = req.body
    const user = await userModel.findOne({email})
    if(!user) return res.json({message:"User does not exist, please create an account"})

    //Login
    // Check if passwordis right
    const resultFromBcrypt = await bcrypt.compare(password,user.password)
    if(resultFromBcrypt) return res.json({message:"Login succesful"})
    return res.json({message:"Please try again"})
})

//Environmental variables
const PORT = process.env.PORT || 4000 
const DB = process.env.DB

mongoose.connect(DB,(err)=>{
    if(err) console.log(err.message)
    else console.log("Data base Connection successful")
})


// Connect to database


// Listening on port
app.listen(PORT,()=>{
    console.log(`Listening live on ${PORT}....`);
})