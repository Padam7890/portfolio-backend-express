import { NextFunction, Request, Response,Router } from "express";
import getContact from "../controllers/contactController/contact.controller";
const router = Router();

router.post('/contact', getContact )

export default router;
