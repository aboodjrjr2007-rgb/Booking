import Booking from "../models/booking.js";
import User from "../models/user.js";
import Rooms from "../models/room.js";
import mongoose from "mongoose";

class BookingController {
  createBooking = async (req, res) => {
    const userId = req.user?.id;
    const { roomId } = req.body;
    const { startTime, endTime } = req.body;
    if (!userId && !roomId && !startTime && !endTime) {
      return res.status(400).send({ error: "Missing requried filed" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .send({
          error: "Booking failed. The specified User ID does not exist.",
        });
    }

    const room = await Rooms.findById(roomId);
    if (!room) {
      return res
        .status(404)
        .send({
          error: "Booking failed. The specified Room ID does not exist.",
        });
    }

    if (
      !mongoose.Types.ObjectId.isValid(userId) === true ||
      !mongoose.Types.ObjectId.isValid(roomId) === true
    ) {
      return res.status(404).send({ error: "invalid input" });
    }

    if (!room.active) {
      return res.status(404).send({ error: "the room in not active for now" });
    }
    if (startTime >= endTime) {
      return res
        .status(409)
        .send({ error: "the start time have to before the end time" });
    }
    const conflictBooking = await Booking.findOne({
      roomid: roomId,
      startTime: {
        $gt: endTime,
      },
      endTime: {
        $lt: startTime,
      },
    });
    if (conflictBooking) {
      return res.status(409).send({
        error:
          "u can't book beacuse there is already room already booked in this time ",
      });
    }
    const roomInfo = await Rooms.findById(roomId);
    const newBooking = await Booking.create({
      userId: userId,
      roomId: roomId,
      roomId : roomInfo.roomId,
      roomName : roomInfo.roomName.toLowerCase(),
      capcity : roomInfo.capcity,
      location : roomInfo.location,
      startTime: startTime,
      endTime: endTime,
    });
    await newBooking.save();
    res.send(newBooking);
  };
  
  listBooking = async (req, res) => {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).send("Enter the right Carditans");
    }
    const findBooking = await Booking.findOne({ userId: userId });
    if (!findBooking) {
      return res.status(404).send("No booking found for this user");
    }
    res.status(200).send(findBooking);
  };

  getBookingDetailsById = async (req, res) => {
    const { bookingId } = req.body;
    if (!bookingId) {
      return res.status(400).send("Enter the right Carditans");
    }
    const getBookingDetails = await Booking.findById(bookingId);
    if (!getBookingDetails) {
      return res.status(404).send("No booking found");
    }
    res.send(getBookingDetails);
  };

  updateBookingById = async (req, res) => {
    const { bookingId ,startTime,endTime} = req.body;
    if (!bookingId) {
      return res.status(400).send("Enter the right Carditans");
    }
    const updateBooking = await Booking.findByIdAndUpdate(bookingId, req.body);
    if (!updateBooking) {
      return res.status(404).send("No booking found to update");
    }
    if(startTime>=endTime){
      return res.status(400).send("U can't update because you make start start greater then or equal end time")
    }
    res.status(200).send("The book update successfully!");
  };

  deleteBookingById = async (req, res) => {
    const { bookingId } = req.body;
    if (!bookingId) {
      return res.status(400).send("Enter the right Carditans");
    }
    const deleteBooking = await Booking.findByIdAndDelete(bookingId);
    if (!deleteBooking) {
      return res.status(404).send("No booking found to delete");
    }
    res.status(200).send("Deleted Successfully!");
  };
}

const bookingController = new BookingController();

export default bookingController;
