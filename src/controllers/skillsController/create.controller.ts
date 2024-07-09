import { Response } from "express";
import CustomRequest from "../../config/customRequest";
import { Skill } from "../../models/models";
import asyncHandler from "../../middleware/asyncHandler";


const createSkills =asyncHandler(async (req, res) => {
  try {
    const { title, descriptions } = req.body;
    const image = req.cloudinaryUrl;
    const skills = new Skill({
      title,
      descriptions,
      image,
    });
    await skills.save();
    return res.status(200).json({ msg: "Skills created successfully" });
  } catch (error:any) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
});

export default createSkills;