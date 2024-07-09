import { Response } from "express";
import CustomRequest from "../../config/customRequest";
import { SkillsPercentage } from "../../models/models";
import asyncHandler from "../../middleware/asyncHandler";

const createSkillPercenatege = asyncHandler (async (req, res)=> {
  try {
    const { title, percentage } = req.body;
    console.log(req.body)
    const saveSkillsPer = new SkillsPercentage({
      title,
      percentage: parseInt(percentage),
    });
    const dataSave = await saveSkillsPer.save();
    return res.status(200).json({
      message: "Skills Percentage added successfully",
      data: dataSave,
    });
  } catch (error:any) {
    console.log(error)
    return res.status(500).json({
      message: "Server error",
      error: error,
    });
  }
});

export default createSkillPercenatege;