const { SkillsPercentage } = require("../../models/models");

const createSkillPercenatege = async (req, res) => {
  try {
    const { title, percentage } = req.body;
    const saveSkillsPer = new SkillsPercentage({
      title,
      percentage: parseInt(percentage),
    });
    const dataSave = await saveSkillsPer.save();
    res.status(200).json({
      message: "Skills Percentage added successfully",
      data: dataSave,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error,
    });
  }
};

module.exports = createSkillPercenatege;