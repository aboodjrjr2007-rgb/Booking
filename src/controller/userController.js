import User from "../models/user.js";

const newUser = async (req,res) => {
 const newuser= await  User.create(req.body)
     await newuser.save()
    res.send(newuser)
}

const findUserByUserId = async (req,res) => {
    const getUser = await User.findOne({userid : req.params.userid})
    res.send(getUser)
}

export default{
  newUser,
findUserByUserId
}