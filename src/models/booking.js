import mongoose, { model } from "mongoose";
import { Schema } from "mongoose";
const newBooking = new Schema({
   bookingid : Number,
   userid :{
   type: Schema.Types.ObjectId,
    ref : "userController",
    required: true
    
   },
   roomid :{
  type: Schema.Types.ObjectId,
   ref : "roomsController",
    required: true,
    available: true
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