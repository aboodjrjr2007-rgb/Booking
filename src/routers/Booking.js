// import express from "express";
import { Router } from "express";
import mongoose from "mongoose";
import bookingController from "../controller/bookingController.js"
// const app = express();

// app.use(express.json());

const router = Router();

 router.post("/createBooking",bookingController.createBooking)


router.get("/listBooking/:userid", bookingController.listBooking);

router.get("/bookingDetails/:bookingid", bookingController.bookingDetails );

router.patch("/updateBooking/:bookingid", bookingController.updateBooking);

router.delete("/deleteBooking/:bookingid", bookingController.deleteBooking);

export default router;
