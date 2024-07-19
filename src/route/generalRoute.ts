import { NextFunction, Request, Response,Router } from "express";
import getContact from "../controllers/contactController/contact.controller";
import createUser from "../controllers/userController/create.controller";
import upload from "../middleware/upload";
import cloudinary from "../utils/cloudinary";
import uploadToCloudinary from "../middleware/cloudsave";
const router = Router();

router.post('/contact', getContact )
// router.post('/signup', upload.single('profileImage'),uploadToCloudinary, createUser);

export default router;

