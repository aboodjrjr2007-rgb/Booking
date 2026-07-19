import express from "express";
import userController from "../controller/userController.js"

const app = express()

app.use(express.json())

const router = express.Router();

router.post("/newUser",userController.newUser)

router.get("/findUserByUserId/:userid",userController.findUserByUserId )

export default router