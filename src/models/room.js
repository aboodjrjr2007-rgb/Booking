import mongoose from "mongoose";
import { Schema } from "mongoose";
const newRoom = new Schema({
  roomid: Number,
  name : String,
  capcity : Number,
  location : String,
  isActive : {
    type: Boolean,
    default: true
  }
 
})


const Rooms = mongoose.model("rooms", newRoom);
export default Rooms;