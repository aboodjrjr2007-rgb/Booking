import mongoose from "mongoose";
import { Schema } from "mongoose";
const roomSchema = new Schema({
  adminId :{
    type : Schema.Types.ObjectId,
    ref : 'Admin',
    required : true
  },
  roomName :{
    type : String,
    required : true
  },
  roomId :{
    type : String,
    required : true
  },
  capcity :{
    type : Number
  },
  location : {
    type : String,
    required : true
  },
  active : {
    type : Boolean,
    default : true
  }
})


const Room = mongoose.model("rooms", roomSchema);
export default Room;