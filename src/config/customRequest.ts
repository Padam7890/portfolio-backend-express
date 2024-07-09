import { Request,Express } from 'express';
export default interface CustomRequest extends Request {
    file?: Express.Multer.File;
    cloudinaryUrl?: string;
    cloudinaryUrls?: string[];
    // files?: Express.Multer.File[];
    // files?: Express.Multer.File[];
}
