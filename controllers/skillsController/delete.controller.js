const { Skill } = require("../../models/models");

const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const skill = await Skill.findByIdAndDelete(id);
    if (!skill) {
      return res.status(404).json({ msg: "skill not found" });
    }
    return res.status(200).json({ msg: "skill deleted" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = deleteSkill;