import express from "express";
import roomsController from "../controller/roomsController.js"


const router = express.Router();   
   

router.post("/newRoom", roomsController.newRoom )

router.get("/getAllRooms", roomsController.getAllRooms)

router.get("/findRoomByRoomid/:roomid", roomsController.findRoomByRoomid)

router.patch("/updateRoom/:roomid", roomsController.updateRoom);

router.delete("/deleteRoom/:roomid", roomsController.deleteRoom);


export default router