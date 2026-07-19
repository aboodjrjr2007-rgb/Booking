import Booking from "../models/booking.js";
import User from "../models/user.js";
import Rooms from "../models/room.js";
import mongoose from "mongoose";
const createBooking = async (req,res) =>{
if (
     !req.body.userid ||
     !req.body.roomid
      ||
     !req.body.startTime ||
     !req.body.endTime
   ) {
     return res.status(400).send({ error: "Missing requried filed" });
   }
   const user = await User.findById(req.body.userid);
   if (!user) {
     return res
       .status(404)
       .send({ error: "Booking failed. The specified User ID does not exist." });
   }

   const room = await Rooms.findById(req.body.roomid);
   if (!room) {
     return res
       .status(404)
       .send({ error: "Booking failed. The specified Room ID does not exist." });
   }

       if (
     !mongoose.Types.ObjectId.isValid(req.body.userid) === true ||
     !mongoose.Types.ObjectId.isValid(req.body.roomid) === true
   ) {
     return res.status(404).send({ error: "invalid input" });
   }

   if (!room.isActive) {
     return res.status(404).send({ error: "the room in not active for now" });
   }
   if (req.body.startTime >= req.body.endTime) {
     return res
       .status(409)
       .send({ error:
         "the start time have to before the end time" });
   }

   const conflictBooking = await Booking.findOne({roomid: req.body.roomid,
     startTime: {
      $lt: 
      req.body.endTime
    },
     endTime: {
      $gt :
      req.body.startTime
    },
    
    }

   )
   if (conflictBooking) {
     return res
       .status(409)
       .send({
         error:
           "u can't book beacuse there is already room already booked in this time ",
       });
   }


     const newBooking = await Booking.create(req.body);
     await newBooking.save();
     res.send(newBooking);
  
     res.send(error);
}


const listBooking = async (req,res) => {
    const listBooking = await Booking.find({ userid: userid });
  res.send(listBooking);

}


const bookingDetails = async (req,res) => {
    const bookingDetails = await Booking.find({
    bookingid: req.params.bookingid,
  });
  res.send(bookingDetails);
}

const updateBooking = async (req,res) => {
    try {
    const updateBooking = await Booking.findOneAndUpdate(
      { bookingid: req.params.bookingid },
      req.body,
    );
    res.status(200).send("Updated Successfully!");
  } catch (error) {
    console.log(error);
  }
}

const deleteBooking = async (req,res) => {
     await Booking.findOneAndDelete({ bookingid: req.params.bookingid });
  res.send("Deleted");
}

export default {
    createBooking,
listBooking, 
bookingDetails,
updateBooking,
deleteBooking
}
