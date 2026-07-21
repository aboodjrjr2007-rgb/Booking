import Room from "../models/room.js";
import Booking from "../models/booking.js";

class RoomController {
createNewRoom = async (req,res) => {
    const adminId = req.params
    const {roomName , roomId , capcity , location} = req.body
    if(!roomName){
         return res.status(404).send("Enter the right Carditans");
    }
    const existRoom = await Room.findOne({roomName : roomName})
    if(existRoom){
        return res.status(400).send("The room already exist")
    }
    const newRoom = await Room.create({
        adminId : adminId,
        roomName : roomName,
        roomId : roomId,
        location : location
    })
    newRoom.save()
    req.status(200).send("Room created")
  }

  getAllRooms = async (req, res) => {
    const getAllRoom = await Room.find();

    if (!getAllRoom) {
      res.status(404).send("No rooms Found");
    }

    res.status(200).send({ allRooms: getAllRoom });
  };

  
  getRoomById = async (req,res) => {
      const roomId = req.params
      if(!roomId){
           return res.status(400).send("Enter the right Carditans")
      }
       const getRoomByid = await Room.findById(roomId)
      if(!getRoomByid) {
          res.status(404).send("No room founded")
      }
      req.status(200).send({room : getRoomByid})
}
deleteRooms = async (req,res) =>{
  const rooms = await Room.find()
  for(const room of rooms){
const futuerBookingExist = await Booking.findById(
    {
      roomId: room_.id,
      endTime : {$gte : new Date()}
   })
   if(futuerBookingExist){
     return res.status(400).send({error: "there is a future booking u can't delete all the Rooms"})
   }
  }
    const deleteAllRooms = await Room.deleteMany()
    if(!deleteAllRooms){
      return res.status(404).send("No room to delete")
    }
    res.status(200).send("All rooms deleted")
  }

  deleteRoomById = async(req,res) =>{
    const roomId = req.params
    
    if(!roomId){
      return res.status(400).send("Enter the right Carditans")
    }
    const deleteRoomByid = await Room.findByIdAndDelete(roomId)
    if(!deleteRoomByid){
      res.send("The room is not  exist")
    }
    const futuerBookingExist = await Booking.findById(roomId,
    {endTime : {$gte : new Date()}
   })
   if(futuerBookingExist){
     return res.status(400).send({error: "there is a booking future for this room"})
   }
    res.send("Deleted Successfully!")
  }

    updateRoomById = async (req,res) => {
        const {roomName} = req.body
        const roomId = req.params
         if(!roomId){
          return res.status(400).send("Enter the right Carditans")
        }
        const updateRoom = await Room.findByIdAndUpdate(
          roomId,
          req.body
        )
        if(!updateRoom) {
         return res.status(404).send("the room is not exist")
        }
        updateRoom.save()
        res.send("The room updated Successfully!")
      }
      getTheBookingRooms = async (req,res) => {
          const findBooking = await Booking.find()
          if(!findBooking) {
            return res.status(404).send("No booked room right now")
          }
          res.status(200).send({Bookedroom  :findBooking})
         }
         getTheBookedRoomById = async(req,res) => {
          const bookedId = req.params
           if(!bookedId){
            return res.status(400).send("Enter the right Carditans")
          }
          const findRoom = await Booking.findById(bookedId)
          if(!findRoom){
            return res.status(404).send("this room is not booked")
          }
          res.status(200).send(findRoom)
         }
}


const roomController = new RoomController()
export default roomController