import mongoose, { model } from "mongoose";
import { Schema } from "mongoose";
const newBooking = new Schema({
   userId :{
   type: Schema.Types.ObjectId,
    ref : "User",
    unique : true
   },
   roomId :{
  type : Schema.Types.ObjectId,
  ref : "Room",
  unique : true
   },
   roomDetails : {
    roomName : String,
    roomId : String,
    capcity : Number,
    location : String
   },

    startTime: {
    type : Date,
    required : true
    },

    endTime:{
    type : Date,
   required : true

    },

    createdAt: {
        type : Date,
        default : Date.now

    }


})

const Booking = mongoose.model("booking", newBooking);
export default Booking