import express from "express";

import { Router } from "express";
import adminController from "../controller/adminController.js";

import valdation from "../Middleware/ValdationMiddleware.js";
import { authForAdmin } from "../Middleware/authMiddleware.js";


const Adminrouter = Router()

Adminrouter.post("/register" , valdation,adminController.register)

Adminrouter.post("/login" ,adminController.login)

Adminrouter.patch("/updateProfile" ,adminController.updateProfile)

Adminrouter.get("/getAllAdmins" , adminController.getAllAdmins)

Adminrouter.get("/getAdminById" , adminController.getAdminById)

Adminrouter.delete("/deleteAlladmins" , adminController.deleteAlladmins)

Adminrouter.delete("/deleteAdminById" , adminController.deleteAdminById)

export default Adminrouter