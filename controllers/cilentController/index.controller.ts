import {Response } from "express";
import CustomRequest from "../../config/customRequest";
import { Client } from "../../models/models";
import asyncHandler from "../../middleware/asyncHandler";


const getCilent = asyncHandler(async (req,res)=> {
  try {
    const cilent = await Client.find();
    return res.status(200).json({
      msg: "cilent found",
      data: cilent,
    });
  } catch (error:any) {
    return res.status(500).json({
      msg: "Something went wrong",
      error: error.message,
    });
  }
});

export default getCilent