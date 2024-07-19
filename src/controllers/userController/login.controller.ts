import { Response } from "express";
import CustomRequest from "../../config/customRequest";
import { User } from "../../models/models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "../../middleware/asyncHandler";

const loginUser = asyncHandler(async (req: CustomRequest, res: Response) => {
  try {
    const { email, password } = req.body;

    console.log('Email:', email);

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid email" });
    }

    // Compare provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid password" });
    }

    // Generate JWT token without expiration
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);

    // Return response with token and user details
    return res.json({
      message: "Logged in successfully",
      accessToken: token,
      key:process.env.JWT_SECRET,
      user: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({ msg: "Server Error" });
  }
});

export default loginUser;
