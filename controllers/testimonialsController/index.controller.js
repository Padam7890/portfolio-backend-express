const { Testimonial } = require("../../models/models");

const showTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.status(200).json({
      msg: "testimonials found",
      data: testimonials,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Server error: ",
      error: error,
    });
  }
};
module.exports = showTestimonials;
