import dotenv from "dotenv";

dotenv.config();
import roomRouter from "./routers/Rooms.js";
import adminRouter from "./routers/Admin.js";
import bookingRouter from "./routers/Booking.js";
import userRouter from "./routers/User.js"
import express from "express";

import mongoose from "mongoose";

import User from "./models/user.js";

import Rooms from "./models/room.js";

import Booking from "./models/booking.js";
const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error(err);
  });

app.use("/admin", adminRouter);

app.use("/user", userRouter);

app.use("/room", roomRouter);

app.use("/booking", bookingRouter);

app.listen(3000, () => {
  console.log("i'm listning");
});
