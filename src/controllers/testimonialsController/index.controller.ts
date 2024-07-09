import { Response } from "express";
import CustomRequest from "../../config/customRequest";
import { Testimonial } from "../../models/models";
import asyncHandler from "../../middleware/asyncHandler";


const showTestimonials = asyncHandler ( async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    return res.status(200).json({
      msg: "testimonials found",
      data: testimonials,
    });
  } catch (error:any) {
   return res.status(500).json({
      msg: "Server error: ",
      error: error,
    });
  }
});
export default showTestimonials;