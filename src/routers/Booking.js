// import express from "express";
import { Router } from "express";
import mongoose from "mongoose";
import bookingController from "../controller/bookingController.js"

import { authForUser } from "../Middleware/authMiddleware.js";

const Bookingrouter = Router();

 Bookingrouter.post("/createBooking",authForUser,bookingController.createBooking)


Bookingrouter.get("/listBooking", bookingController.listBooking);

Bookingrouter.get("/bookingDetails", bookingController.getBookingDetailsById );

Bookingrouter.patch("/updateBooking", bookingController.updateBookingById);

Bookingrouter.delete("/deleteBooking", bookingController.deleteBookingById);

export default Bookingrouter;
