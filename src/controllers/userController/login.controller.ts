import { Response } from "express";
import CustomRequest from "../../config/customRequest";
import { User } from "../../models/models";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import asyncHandler from "../../middleware/asyncHandler";

const loginUser = asyncHandler ( async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email)
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid email" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);
    return res.json({
      message: "Logged in successfully",
      accessToken: token,
      user: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.log(error);
   return res.status(500).json({ msg: "Server Error" });
  }
});

export default loginUser