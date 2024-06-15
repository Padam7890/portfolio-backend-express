// // Skills Schema
// const SkillsSchema = new Schema({
//     title: { type: String, required: true },
//     descriptions: { type: String, required: true },
//     image: { type: String, required: true },
//   });

const { Skill } = require("../../models/models");

const updateSkills = async (req, res) => {
  try {
    const { id } = req.params; 
    const { title, descriptions } = req.body;

    const image = req.cloudinaryUrl;
    // Construct the update object
    const update = {};
    if (title) update.title = title;
    if (descriptions) update.descriptions = descriptions;
    if (image) update.image = image;

    // Find skill by ID and update
    const skill = await Skill.findByIdAndUpdate(id, update, { new: true });

    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    res.status(200).json({ skill });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = updateSkills;
