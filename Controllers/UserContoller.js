const { json } = require("express");

const users =require('../Models/userSchema')

// import json webtoken
const jwt =require('jsonwebtoken')

//register logic
exports.register=async(req,res)=>{
    console.log("Inside Register");
        const {username,email,password}=req.body
    try{
        // cheching users existing in mongo
        const existingUser=await users.findOne({email})
        if(existingUser){
            res.status(401).json("User Already Registered")
        }
        else{
            const newUser =await users({
                username,email,password,github:"",link:"",profile:""
            })
            await newUser.save()
            res.status(200).json("user registration succesfull")
        }
    }
    catch(err){
        res.status(500).json("server error" +err.message)
}
}

//login logic
exports.login = async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await users.findOne({email,password})
            if(user){
                //token genereation
                const token = jwt.sign({userId:user._id},"superkey2024")
                console.log(token);
                res.status(200).json({user,token})
            }
            else{
                res.status(404).json("Invalid Detalis")
            }
    }
    catch(err){
        res.status(500).json("server error" +err.message)
}

}