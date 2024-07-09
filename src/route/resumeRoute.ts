
// import { NextFunction, Request, Response,Router } from "express";
// import resumeSave from "../controllers/resumeController/create.controller";
// import getResume from "../controllers/resumeController/index.controller"
// import updateResume from "../controllers/resumeController/update.controller";
// const router =  Router();

// router.get("/", getResume);
// // router.post('/', resumeSave);
// // router.put('/:id', updateResume)


// export default Router;





import { NextFunction, Request, Response,Router } from "express";
import getResume from "../controllers/resumeController/index.controller";
import updateResume from "../controllers/resumeController/update.controller";
import resumeSave from "../controllers/resumeController/create.controller";

const router =  Router();

router.get("/", getResume);
router.post('/', resumeSave);
router.put('/:id', updateResume)

export default router;
