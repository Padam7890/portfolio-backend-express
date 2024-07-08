import { Response } from "express";
import CustomRequest from "../../config/customRequest";
import { Skill } from "../../models/models";
import asyncHandler from "../../middleware/asyncHandler";

const showSkills = asyncHandler (async (req, res)=> {
  try {
    const skills = await Skill.find();
    return res.status(200).json({
      msg: "skills found",
      data: skills,
    });
  } catch (error:any) {
    return res.status(500).json({
      msg: "Something went wrong",
      error: error.message,
    });
  }
});

export default showSkills;