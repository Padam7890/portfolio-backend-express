import asyncHandler from "../middleware/asyncHandler";
import { Role } from "../models/models";

const checkRole = (requiredRole: string) => {
  return asyncHandler(async (req, res, next) => {
    // Ensure req.user is defined and has a role property
    if (req.user && req.user.roles) {
         console.log("User Role" +req.user.roles)

         //get role

         const getRole:any = await Role.findOne({
            _id:req.user.roles
         })
        const hasRole = getRole.name === requiredRole;
      if (hasRole) {
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
