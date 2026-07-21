import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";

import Admin from "../models/admin.js";

import { generateTokens } from "../Middleware/authMiddleware.js";

import Room from "../models/room.js";

import Booking from "../models/booking.js";

class AdminController {
  register = async (req, res) => {
    const { firstName, lastName, email, password, role, isSuperAdmin } =
      req.body;
    if (!firstName && !lastName && !email && !password) {
     return res.status(400).send("Enter the right Carditans");
    }
    const existAdmin = await Admin.findOne({ email: email.toLowerCase() });
    if (existAdmin) {
      return res.status(404).send("This email already used");
    }
    const hashPsw = await bcrypt.hash(password, 12);
    const newAdmin = await Admin.create({
      firstName: firstName.toLowerCase(),
      lastName: lastName.toLowerCase(),
      email: email.toLowerCase(),
      password: hashPsw,
      phoneNumber,
      role: role,
      isSuperAdmin: isSuperAdmin,
    });
    await newAdmin.save();
    req.status(200).send("New admin created");
  };

  login = async (req, res) => {
    const { firstName, lastName, email, password, isSuperAdmin, role } =
      req.body;
    if (!email && !password) {
      return res.status(404).send("Enter the right Carditans");
    }
    const existAdmin = await Admin.findOne({
      email: email.toLowerCase(),
      password,
    });
    if (!existAdmin) {
      return res.status(404).send("Your email or password is wrong");
    }
    const count = await Admin.countDocuments();
    if (count === 0) {
      const hashPsw = await bcrypt.hash(password, 12);
      const newAdmin = await Admin.create({
        firstName: firstName.toLowerCase(),
        lastName: lastName.toLowerCase(),
        email: email.toLowerCase(),
        password: hashPsw,
        role: en.SUPER_ADMIN,
        isSuperAdmin: true,
        phoneNumber: phoneNumber,
      });
      newAdmin.save();
      return res.status(200).send("No admin found , First admin created");
    }
    const Paylod = { id: Admin.id, email: Admin.email, psw: Admin.password };

    const accessToken = generateTokens(Paylod);
    const refreshToken = jwt.sign(Paylod, process.env.REFRESH_TOKEN_SECRET);
    let refreshTokens = [];
    refreshTokens.push(refreshToken);
    res
      .status(200)
      .send({ accessToken: accessToken, refreshToken: refreshToken });
  };

  updateProfile = async (req,res) =>{
    const id = req.params
    const update = await Admin.findByIdAndUpdate(id,req.body)
    if(!update){
        return res.status(400).send("no user founded to update")
    }
    req.status(200).send("Updated Successfully!")

}

}
const adminController = new AdminController()

export default adminController