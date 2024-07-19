import asyncHandler from "../middleware/asyncHandler";
import { Role } from "../models/models";
import { Request, Response, NextFunction } from "express";

const checkRole = (requiredRole: string) => {
  return asyncHandler(async (req, res ,next) => {
    // Ensure req.user is defined and has a roles property
    if (req.user && req.user.roles) {
      console.log("User Roles:", req.user.roles);

      // Find the role in the database
      const getRole = await Role.findById(req.user.roles);
      if (getRole && getRole.name === requiredRole) {
        return next();
      } else {
        return res.status(403).json({ msg: "Access denied" });
      }
    } else {
      return res.status(403).json({ msg: "Access denied" });
    }
  });
};

export default checkRole;
