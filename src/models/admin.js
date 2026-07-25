import mongoose from "mongoose";

import { Schema } from "mongoose";
import { required } from "zod/mini";

const en = ({
  SUPER_ADMIN: 'Super Admin',
  ADMIN: 'Admin'
});

const Admin = new Schema ({
    firstName: {
        type : String,
        required : true,
        default : "test"
    },
    lastName :{
         type : String,
        required : true,
        default : "admin"
    },
    email :{
        type : String,
        required : true,
        unique : true
    },
    password :{
        type : String,
        required : true
    },
    phoneNumber :{
        type : String,
        
    },
    isSuperAdmin : {
        type : Boolean,
        default : false
    },
    role :{
        type : String,
        default : en.ADMIN,
        required : true
    }
})

const admin = mongoose.model("admin" , Admin)

export default admin

