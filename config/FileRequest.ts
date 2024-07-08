
import { Request,Express } from 'express';

export default interface CustomFileRequest extends Request {
    file?: Express.Multer.File;
    cloudinaryUrl?: string;
    cloudinaryUrls?: string[];
    files?: Express.Multer.File[];
    // files?: Express.Multer.File[];
}