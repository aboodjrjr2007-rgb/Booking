import User from "../models/user.js";

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
    req.status(200).send("You register Successfully!")
}
login = async (req, res) => {
    const {email, password } =
      req.body;
    if (!email && !password) {
      return res.status(404).send("Enter the right Carditans");
    }
    const existAdmin = await User.findOne({
      email: email.toLowerCase(),
      password,
    });
    if (!existAdmin) {
      return res.status(404).send("Your email or password is wrong");
    }
    
    const Paylod = { id: User.id, email: User.email, psw: User.password };

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
    const update = await User.findByIdAndUpdate(id,req.body)
    if(!update){
        return res.status(400).send("no user founded to update")
    }
    req.status(200).send("Updated Successfully!")

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