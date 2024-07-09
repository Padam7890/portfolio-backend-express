import { NextFunction, Request, Response,Router } from "express";
import deleteSkills from "../controllers/skillsController/delete.controller"
import showSkills from "../controllers/skillsController/index.controller"
import createSkillPercentage from "../controllers/skillsPercentageController/create.controller"
import getSkillPercentage from "../controllers/skillsPercentageController/index.controller"
const router =  Router();

router.delete("/:id",deleteSkills);
router.get("/", showSkills)
router.post("/skillpercentage", createSkillPercentage)
router.get("/skillpercentage", getSkillPercentage)
export default router;

