import Rooms from "../models/room.js";
import Booking from "../models/booking.js";


const newRoom = async (req,res) => {
    const newRoom= await  Rooms.create(req.body)
    await newRoom.save();
    res.send(newRoom)
}

const getAllRooms = async (req,res) => {
    const GetALLrooms = await Rooms.find()
    res.send(GetALLrooms)
}

const findRoomByRoomid = async (req,res) => {
    const getSpecificRoom = await Rooms.findOne({roomid : req.params.roomid})
    res.send(getSpecificRoom)
}

const updateRoom = async (req,res) => {
     try {
    const updatedRoom = await Rooms.findOneAndUpdate(
      {roomid : req.params.roomid},
      req.body,
    );
    res.status(200).send("Updated Successfully!")
  } catch (error) {
    console.log(error);
  }
}

const deleteRoom = async (req,res) => {
    const futuerBookingExist = await Booking.findOneAndDelete({roomid:req.params.roomid ,
    endTime : req.params.endTime
   })
   if(futuerBookingExist){
     return res.status(400).send({error: "there is a booking future for this room"})
   }
 const id= req.params.roomid
 await Rooms.findByIdAndDelete(id);
  res.send("Deleted");
}

export default {
    newRoom,
    getAllRooms,
    findRoomByRoomid,
    updateRoom,
    deleteRoom
}