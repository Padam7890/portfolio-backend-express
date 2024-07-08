import { Response } from "express";
import CustomRequest from "../../config/customRequest";
import { Skill } from "../../models/models";
import asyncHandler from "../../middleware/asyncHandler";

const updateSkills = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params; 
    const { title, descriptions } = req.body;

    const image = req.cloudinaryUrl;
    // Construct the update object
    const update:{[key:string]:string} = {};
    if (title) update.title = title;
    if (descriptions) update.descriptions = descriptions;
    if (image) update.image = image;

    // Find skill by ID and update
    const skill = await Skill.findByIdAndUpdate(id, update, { new: true });

    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    return res.status(200).json({ skill });
  } catch (error:any) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

export default updateSkills;