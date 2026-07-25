import express from "express";

import { Router } from "express";
import adminController from "../controller/adminController.js";

import valdation from "../Middleware/ValdationMiddleware.js";
import { authForAdmin } from "../Middleware/authMiddleware.js";


const router = Router()

router.post("/register" , valdation,adminController.register)

router.post("/login" ,adminController.login)

router.patch("/updateProfile" ,adminController.updateProfile)

export default router