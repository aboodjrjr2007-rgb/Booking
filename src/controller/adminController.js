import jwt from "jsonwebtoken";
import bcrypt, { hash } from "bcrypt";
import Admin from "../models/admin.js";
import { generateTokens } from "../Middleware/authMiddleware.js";
import Room from "../models/room.js";
import Booking from "../models/booking.js";
import { en } from "../models/admin.js";

class AdminController {
  register = async (req, res) => {
    const {
      firstName,
      lastName,
      email,
      password,
      role,
      phoneNumber,
    } = req.body;
    if (!firstName && !lastName && !email && !password) {
      return res.status(400).send("Enter the right Carditans");
    }

    const existAdmin = await Admin.findOne({
      email: email.toLowerCase(),
    });
    if (existAdmin) {
      return res.status(400).send("This email already used");
    }

    const hashPsw = await bcrypt.hash(password, 12);

    const newAdmin = await Admin.create({
      firstName: firstName.toLowerCase(),
      lastName: lastName.toLowerCase(),
      email: email.toLowerCase(),
      password: hashPsw,
      phoneNumber: phoneNumber,
      role: role,
    });
    await newAdmin.save();
    res.status(200).send("New admin created");
  };

  login = async (req, res) => {
    const {
      firstName,
      lastName,
      email,
      password,
      isSuperAdmin,
      role,
      phoneNumber,
    } = req.body;
    if (!email && !password) {
      return res.status(404).send("Enter the right Carditans");
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
    const existAdmin = await Admin.findOne({
      email: email.toLowerCase(),
    });
    if (!existAdmin) {
      return res.status(404).send("Your email or password is wrong");
    }
    const Paylod = {
      id: existAdmin._id,
      email: existAdmin.email,
      psw: existAdmin.password,
    };

    const accessToken = generateTokens(Paylod);
    const refreshToken = jwt.sign(Paylod, process.env.REFRESH_TOKEN_SECRET);
    let refreshTokens = [];
    refreshTokens.push(refreshToken);
    res
      .status(200)
      .send({ accessToken: accessToken, refreshToken: refreshToken });
  };

  updateProfile = async (req, res) => {
    const id = req.body.id;

    const { firstName, lastName, email, password } = req.body;
    const hashPsw = await bcrypt.hash(password, 12);
    const update = await Admin.findByIdAndUpdate(id, {
      firstName : firstName.toLowerCase(),
      lastName : lastName.toLowerCase(),
      email : email.toLowerCase(),
      password: hashPsw,
    });
    if (!update) {
      return res.status(404).send({ message: "No profile to update" });
    }
    res.status(200).send("Updated Successflly !");
  };

  getAllAdmins = async (req,res) => {
    const getAdmins = await Admin.find()
    if(!getAdmins){
      return res.status(404).send("No admin found")
    }
    res.status(200).send({Admin : getAdmins})
  }

  getAdminById = async (req,res) => {
    const {adminId} = req.body
    const getAdmin = await Admin.findById(adminId)
    if(!getAdmin){
      return res.status(404).send("No admin with this id")
    }
    res.status(200).send({adminInfo : getAdmin})
  }
  deleteAlladmins = async(req,res) => {
    await Admin.deleteMany()
    res.status(200).send("Deleted Successfully !")
  }
  deleteAdminById = async (req,res) => {
    const {adminId} = req.body
    const deleteAdmin = await Admin.findByIdAndDelete(adminId)
    if(!deleteAdmin) {
      return res.status(404).send("This admin is not exist")
    }
    res.sattus(200).send("Deleted Successfully!")
  }
}


const adminController = new AdminController();

export default adminController;
