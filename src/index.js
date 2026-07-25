import dotenv from "dotenv"

dotenv.config()


import express from "express";

import mongoose from "mongoose";

import User from "./models/user.js";

import Rooms from "./models/room.js";

import Booking from "./models/booking.js";
const app = express()

app.use(express.json())

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error(err);
  });

  import adminRouter from "./routers/Admin.js"

  app.use("/admin", adminRouter)

import userRouter from "./routers/User.js";

app.use("/user", userRouter)

import roomRouter from "./routers/Rooms.js"

app.use("/room", roomRouter)

import bookingRouter from "./routers/Booking.js"

app.use("/booking", bookingRouter)

app.listen(3000, () =>{
console.log("i'm listning")
})