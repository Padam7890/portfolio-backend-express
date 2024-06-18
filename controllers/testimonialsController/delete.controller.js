const { Testimonial } = require("../../models/models");

const deleteTestimonials = async (req, res) => {
  try {
    const { id } = req.params;
    const deletetest = await Testimonial.findByIdAndDelete(id);
    res.status(200).json({
      msg: "deleted successfully",
    });
  } catch (error) {
    res.status(200).json({
        msg: "something went wrong",
        error:error
      });
  }
};

module.exports =deleteTestimonials;