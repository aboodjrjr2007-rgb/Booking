import jwt from "jsonwebtoken"

import bcrypt from "bcrypt"

import Admin from "../models/admin.js"

class adminController {
    register = async (req,res) =>{
        const {firstName , lastName , email , password } = req.body
        if (!firstName && !lastName && !email && !password ){
            res.status(400).send("Enter the right Carditans")
        }
        const existAdmin = await Admin.find({email : email.toLowerCase()})
        if(existAdmin) {
          return  res.status(404).send("This email already used")
        }
        const newAdmin = await Admin.create()
        req.status(200).send("New admin created")
    }
}