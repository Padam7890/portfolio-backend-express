import { Response } from "express";
import CustomRequest from "../../config/customRequest";
import { EducationExperience } from "../../models/models";
import asyncHandler from "../../middleware/asyncHandler";



interface ResumeBody {
    title: string;
    dateFrom: string;
    dateTo: string;
    type: string;
    description: string;
  }
  const updateResume = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const { title, dateFrom, dateTo, type, description } = req.body;
      const dateFromConvert = dateFrom ? new Date(dateFrom).toISOString() : null;
      const dateToConvert = dateTo ? new Date(dateTo).toISOString() : null;
  
      const update: Partial<ResumeBody> = {};
      if (title) update.title = title;
      if (dateFromConvert) update.dateFrom = dateFromConvert;
      if (dateToConvert) update.dateTo = dateToConvert;
      if (type) update.type = type;
      if (description) update.description = description;
  
      const resume = await EducationExperience.findByIdAndUpdate(id, update, { new: true });
      if (!resume) {
        return res.status(404).json({ message: "Resume not found" });
      }
  
      return res.status(200).json({
        message: "Resume updated successfully",
        data: resume,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: "Server error",
        error: error.message,
      });
    }
  });
  
  export default updateResume;