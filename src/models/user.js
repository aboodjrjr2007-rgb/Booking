import mongoose from "mongoose";
import { Schema } from "mongoose";
const newUser = new Schema({
    userid: Number,
    name :{ 
        type :String,
        require : true
    },
    email : {
       type : String,
       require : true
    }
})
const User = mongoose.model("user", newUser);
export default User