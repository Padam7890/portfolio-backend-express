import { Response } from "express";
import CustomRequest from "../../config/customRequest";
import { Testimonial } from "../../models/models";
import asyncHandler from "../../middleware/asyncHandler";

const deleteTestimonials = asyncHandler ( async (req, res) => {
  try {
    const { id } = req.params;
    const deletetest = await Testimonial.findByIdAndDelete(id);
    return res.status(200).json({
      msg: "deleted successfully",
    });
  } catch (error:any) {
    return res.status(200).json({
        msg: "something went wrong",
        error:error
      });
  }
});

export default deleteTestimonials;