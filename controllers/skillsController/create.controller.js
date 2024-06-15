
const { Skill } = require("../../models/models");

const createSkills = async (req, res) => {
  try {
    const { title, descriptions } = req.body;
    const image = req.cloudinaryUrl;
    const skills = new Skill({
      title,
      descriptions,
      image,
    });
    await skills.save();
    res.status(200).json({ msg: "Skills created successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" });
  }
};

module.exports = createSkills;
