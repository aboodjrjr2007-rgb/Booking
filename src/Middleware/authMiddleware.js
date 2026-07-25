import jwt from "jsonwebtoken";

import express from "express";
import Admin from "../models/admin.js"

import User from "../models/user.js"

import Valdtaion from "../Valdation/Valdation.js";

import { success } from "zod";

const generateTokens = (Paylod) => {
  return jwt.sign(Paylod, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
};

const authForAdmin = async (req,res,next) =>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
     if(token == null) return res.sendStatus(401)

        const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        const admin = await Admin.findById(decoded.id)
        console.log(admin)
        if(!admin) {
            console.log("admin not found")
        }
        req.admin = admin
             next()
}

const authForUser = async (req,res,next) =>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token === null){
        return res.sendStatus(401)
    }
    const decoded = await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    const user = await User.findById(decoded.id)
        console.log(user)
        if(!user) {
            console.log("user not found")
        }
        req.user = user
             next()
}



export {authForUser,authForAdmin,generateTokens}