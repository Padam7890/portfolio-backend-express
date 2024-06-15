
const { Skill } = require("../../models/models");

const showSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.status(200).json({
      msg: "skills found",
      data: skills,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports = showSkills;
