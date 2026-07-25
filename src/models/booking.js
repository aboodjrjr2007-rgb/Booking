import mongoose, { model } from "mongoose";
import { Schema } from "mongoose";
import { id } from "zod/locales";
const bookingSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    unique: true,
  },
  roomId: {
    type: Schema.Types.ObjectId,
    ref: "Room",
    unique: true,
  },

  startTime: {
    type: Date,
    required: true,
  },

  endTime: {
    type: Date,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Booking = mongoose.model("booking", bookingSchema);
export default Booking;
