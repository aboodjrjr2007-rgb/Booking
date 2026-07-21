import express from "express";

import { Router } from "express";
import adminController from "../controller/adminController";

import valdation from "../Middleware/ValdationMiddleware";

const router = Router()

router.post("/register" , valdation,adminController.register)

router.post("/register" , valdation,adminController.login)

router.patch("/updateProfile" , valdation,adminController.updateProfile)

export default router