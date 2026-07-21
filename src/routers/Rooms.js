import express from "express";
import roomController from "../controller/roomsController.js";


const router = express.Router();   
   

router.post("/newRoom", roomController.createNewRoom )

router.get("/getAllRooms", roomController.getAllRooms)

router.get("/findRoomByRoomid", roomController.getRoomById)

router.patch("/updateRoom", roomController.deleteRoomById);

router.delete("/deleteRoom", roomController.deleteRoomById);

router.delete("/deleteAllRooms",roomController.deleteRooms)

router.get("/getTheBookingRooms",roomController.getTheBookingRooms)

router.get("/getTheBookedRoomById",roomController.getTheBookedRoomById)




export default router