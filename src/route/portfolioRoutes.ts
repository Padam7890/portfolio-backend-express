import { NextFunction, Request, Response,Router } from "express";
import createPortfolio from "../controllers/portfolioController/create.controller";
import upload from "../middleware/upload";
import uploadToCloudinary from "../middleware/cloudsave";
import {getCategory, getPortfolio, getPortfolioByCategory} from "../controllers/portfolioController/index.controller"
const router = Router();

router.post('/', upload.single('image'), uploadToCloudinary, createPortfolio);
router.get('/all', getPortfolio)
router.get('/category', getCategory)
router.get('/', getPortfolioByCategory)
export default router;