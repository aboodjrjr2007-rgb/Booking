// import express from "express";
import { Router } from "express";
import mongoose from "mongoose";
import bookingController from "../controller/bookingController.js"



const router = Router();

 router.post("/createBooking",bookingController.createBooking)


router.get("/listBooking", bookingController.listBooking);

router.get("/bookingDetails", bookingController.getBookingDetailsById );

router.patch("/updateBooking", bookingController.updateBookingById);

router.delete("/deleteBooking", bookingController.deleteBookingById);

export default router;
