import { Response } from "express";
import CustomRequest from "../../config/customRequest";
import asyncHandler from "../../middleware/asyncHandler";

const { Testimonial } = require("../../models/models");

const updateTestimonials = asyncHandler (async (req, res)=> {
  try {
    const { id } = req.params;
    const { name, descriptions } = req.body;

    const photo = req.cloudinaryUrl;

    const update:{[key:string]:string} = {};
    if (name) update.name = name;
    if (descriptions) update.descriptions = descriptions;
    if (photo) update.photo = photo;

    const testimonials = Testimonial.findByIdAndUpdate(id, update, {
      new: true,
    });
    if (!testimonials) {
      return res.status(404).json({
        msg: "testimonials not found",
      });
    }
    return res.status(200).json({
      msg: "testimonials Updated successfully",
    });
  } catch (error:any) {
    return res.status(500).json({
      msg: "Server error",
      error: error,
    });
  }
});

export default updateTestimonials;