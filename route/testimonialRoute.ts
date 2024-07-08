import {NextFunction, Request, Response, Router} from 'express';
import showTestimonials from "../controllers/testimonialsController/index.controller"
import upload from '../middleware/upload';
import uploadToCloudinary from '../middleware/cloudsave';
import createTestimonials from "../controllers/testimonialsController/create.controller"
import updateTestimonials from "../controllers/testimonialsController/update.controller"
import deleteTestimonials from "../controllers/testimonialsController/delete.controller"
const router = Router();

router.get("/", showTestimonials);
router.post(
  "/",
  upload.single("photo"),
  uploadToCloudinary,
  createTestimonials
);
router.put(
  "/:id",
  upload.single("photo"),uploadToCloudinary,
  updateTestimonials
);
router.delete("/:id", deleteTestimonials);

export default router;
