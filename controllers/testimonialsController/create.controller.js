

const { Testimonial } = require("../../models/models");

const createTestimonials = async (req, res) => {
  try {
    const { name, descriptions } = req.body;
    const photo = req.cloudinaryUrl;

    const saveTestimonials = new Testimonial({
      name,
      descriptions,
      photo,
    });
    await saveTestimonials.save();

    res.status(201).json({
      msg: "Testimonials saved successfully",
      data: saveTestimonials,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Server Error",
      error: error,
    });
  }
};
module.exports = createTestimonials;
