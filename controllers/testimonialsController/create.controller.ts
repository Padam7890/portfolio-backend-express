import { Response } from "express";
import CustomRequest from "../../config/customRequest";
import { Testimonial } from "../../models/models";
import asyncHandler from "../../middleware/asyncHandler";


const createTestimonials = asyncHandler ( async (req, res) => {
  try {
    const { name, descriptions } = req.body;
    const photo = req.cloudinaryUrl;

    const saveTestimonials = new Testimonial({
      name,
      descriptions,
      photo,
    });
    await saveTestimonials.save();

   return res.status(201).json({
      msg: "Testimonials saved successfully",
      data: saveTestimonials,
    });
  } catch (error:any) {
   return res.status(500).json({
      msg: "Server Error",
      error: error,
    });
  }
});

export default createTestimonials