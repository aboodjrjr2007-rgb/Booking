import User from "../models/user.js";
 import bcrypt, { hash } from "bcrypt";
 import jwt from "jsonwebtoken"
 import { generateTokens } from "../Middleware/authMiddleware.js";
class UserController {
    register = async (req,res) => {
const { firstName, lastName, email, password  } =
      req.body;
    if (!firstName && !lastName && !email && !password) {
     return res.status(400).send("Enter the right Carditans");
    }
    const existUser = await User.findOne({ email: email.toLowerCase()});
    if (existUser) {
      return res.status(404).send("This email already used");
    }
    const hashPsw = await bcrypt.hash(password,12)
    const user = await User.create({
      firstName : firstName.toLowerCase(),
      lastName : lastName.toLowerCase(),
      email : email.toLowerCase(),
      password : hashPsw
    })
    user.save()
    res.status(200).send("You register Successfully!")
}
login = async (req, res) => {
    const {email, password } =
      req.body;
    if (!email && !password) {
      return res.status(404).send("Enter the right Carditans");
    }
    const existUser = await User.findOne({
      email: email.toLowerCase(),
    });
    if (!existUser) {
      return res.status(404).send("Your email or password is wrong");
    }
    
    const Paylod = { id: existUser.id, email: existUser.email, psw: existUser.password };

    const accessToken = generateTokens(Paylod);
    const refreshToken = jwt.sign(Paylod, process.env.REFRESH_TOKEN_SECRET);
    let refreshTokens = [];
    refreshTokens.push(refreshToken);
    res
      .status(200)
      .send({ accessToken: accessToken, refreshToken: refreshToken });
  };

  updateProfile = async (req,res) =>{
    
    const {firstName , lastName , password , email} = req.body
    const hashPsw = await bcrypt.hash(password,12)
    const update = await User.findOneAndUpdate({email : email.toLowerCase()},
      {
        emaill : email.toLowerCase(),
        password : hashPsw,
        firstName : firstName,
        lastName : lastName
      }
    )
    if(!update){
        return res.status(400).send("No user found to update")
    }
    res.status(200).send("Updated Successfully!")

}

 deleteProfile = async (req, res) => {
    const { email } = req.body;

    const deleteUser = await User.findOneAndDelete({
      email: email.toLowerCase(),
    });
    if (!deleteUser) {
      return res.status(404).send("No user exist to delete");
    }
    res.status(200).send("User deleted Successfully !");
  };


}

const userController = new UserController()

export default userController