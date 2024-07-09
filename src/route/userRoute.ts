import express, { NextFunction, Request, Response } from "express";
import upload from "../middleware/upload";
import uploadToCloudinary from "../middleware/cloudsave";
import createUser from "../controllers/userController/create.controller";
import loginUser from "../controllers/userController/login.controller";
import userDetails from "../controllers/userController/userDetails.controller";

const router = express.Router();

router.post('/', upload.single('profileImage'),uploadToCloudinary, createUser);
router.post('/login',loginUser);
router.get('/user', userDetails);

export default router;
