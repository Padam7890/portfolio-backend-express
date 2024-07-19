import { Response } from "express";
import CustomRequest from "../../config/customRequest";
import { User } from "../../models/models";
import asyncHandler from "../../middleware/asyncHandler";

const userDetails = asyncHandler (async (req, res) => {
  try {
    const user = await User.find()
      .sort({
        _id: 1,
      })
      .limit(1)
      .select(
        "-password"
      )
      
      ;
    return res.status(200).json({
      msg: "user details found",
      data: user,
    });
  } catch (error:any) {
    return res.status(500).json({
      msg: "Something went wrong",
      error: error.message,
    });
  }
});

export default userDetails;