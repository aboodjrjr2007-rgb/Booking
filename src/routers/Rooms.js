import express from "express";
import roomController from "../controller/roomsController.js";
import {authForAdmin}  from "../Middleware/authMiddleware.js";

const router = express.Router();   
   

router.post("/newRoom", authForAdmin,roomController.createNewRoom )

router.get("/getAllRooms", authForAdmin,roomController.getAllRooms)

router.get("/findRoomById", roomController.getRoomById)

router.patch("/updateRoom", roomController.updateRoomById);

router.delete("/deleteRoom", roomController.deleteRoomById);

router.delete("/deleteAllRooms",roomController.deleteRooms)

router.get("/getTheBookingRooms",roomController.getTheBookingRooms)

router.get("/getTheBookedRoomById",roomController.getTheBookedRoomById)




export default router