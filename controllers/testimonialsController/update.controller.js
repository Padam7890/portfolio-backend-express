const { Testimonial } = require("../../models/models");

const updateTestimonials = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, descriptions } = req.body;

    const photo = req.cloudinaryUrl;

    const update = {};
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
  } catch (error) {
    return res.status(500).json({
      msg: "Server error",
      error: error,
    });
  }
};

module.exports = updateTestimonials;
