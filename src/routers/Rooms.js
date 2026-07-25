import express from "express";
import roomController from "../controller/roomsController.js";
import {authForAdmin}  from "../Middleware/authMiddleware.js";

const Roomrouter = express.Router();   
   

Roomrouter.post("/newRoom", authForAdmin,roomController.createNewRoom )

Roomrouter.get("/getAllRooms", authForAdmin,roomController.getAllRooms)

Roomrouter.get("/findRoomById", roomController.getRoomById)

Roomrouter.patch("/updateRoom", roomController.updateRoomById);

Roomrouter.delete("/deleteRoom", roomController.deleteRoomById);

Roomrouter.delete("/deleteAllRooms",roomController.deleteRooms)

Roomrouter.get("/getTheBookingRooms",roomController.getTheBookingRooms)

Roomrouter.get("/getTheBookedRoomById",roomController.getTheBookedRoomById)




export default Roomrouter