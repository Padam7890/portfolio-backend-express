import CustomRequest from "../../config/customRequest";
import { Response } from "express";
import { EducationExperience } from "../../models/models";
import asyncHandler from "../../middleware/asyncHandler";


const resumeSave =asyncHandler(async (req, res)=> {
  try {

    const { title, dateFrom, dateTo, type, description } = req.body;
    const dateFromConvert = dateTo ? new Date(dateTo): null;
    const dateToConvert = dateFrom ? new Date(dateFrom): null;

    if (type !== "education" && type !== "experience") {
      return res.status(400).json({ message: "Invalid type" });
    }

    const saveResume = new EducationExperience({
      title,
      dateFrom: dateFromConvert,
      dateTo: dateToConvert,
      description,
      type,
    });
    const savedResume = await saveResume.save();
    return res.status(200).json({
      msg: "Resume saved successfully",
      data: savedResume,
    });
  } catch (error:any) {
    console.log(error)
    return res.status(500).json({ msg: "Server Error", error: error });
  }
});

export default resumeSave;