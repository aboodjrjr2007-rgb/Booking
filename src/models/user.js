import mongoose from "mongoose";
import { Schema } from "mongoose";
const newUser = new Schema({
    firstName :{
        type : String,
        required : true
    },
      lastName :{
        type : String,
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    phoneNumber :{
        type : String,
       
    }
    
})
const User = mongoose.model("user", newUser);
export default User