import { NextFunction, Request, Response,Router } from "express";
import deleteSkills from "../controllers/skillsController/delete.controller"
import showSkills from "../controllers/skillsController/index.controller"

const router =  Router();

router.delete("/:id",deleteSkills);
router.get("/", showSkills)

export default router;
