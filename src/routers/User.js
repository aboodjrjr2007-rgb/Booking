import express from "express";
import userController from "../controller/userController.js"

import valdation from "../Middleware/ValdationMiddleware.js";

const router = express.Router();

router.post("/register",valdation,userController.register)

router.get("/login",userController.login)

router.patch("/updateProfile"  , userController.updateProfile)

router.delete("/deleteProfile" , valdation , userController.deleteProfile)

export default router