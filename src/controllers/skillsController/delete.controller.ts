import { NextFunction, Response } from "express";
import CustomRequest from "../../config/customRequest";
import { Skill } from "../../models/models";
import asyncHandler from '../../middleware/asyncHandler'

const deleteSkill = asyncHandler(async (req, res) => {
  try {
      const { id } = req.params;
      const skill = await Skill.findByIdAndDelete(id);
      if (!skill) {
          return res.status(404).json({ msg: 'Skill not found' });
      }
      return res.status(200).json({ msg: 'Skill deleted' });
  } catch (err: any) {
      return res.status(500).json({ msg: err.message });
  }
});

export default deleteSkill;