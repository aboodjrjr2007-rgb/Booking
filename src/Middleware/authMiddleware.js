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
    if(token === null){
        return res.sendStatus(401)
    }
    const decode = await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    req.admin = await Admin.findById(decode.id)

    next()
}

const authForUser = async (req,res,next) =>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token === null){
        return res.sendStatus(401)
    }
    const decode = await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    req.user = await User.findById(decode.id)

    next()
}



export {authForUser,authForAdmin,generateTokens}