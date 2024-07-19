import { Request,Express } from 'express';
// Import IUser or define it as needed
export default interface CustomRequest extends Request {
    file?: Express.Multer.File;
    cloudinaryUrl?: string;
    cloudinaryUrls?: string[];
    user?:any
    // files?: Express.Multer.File[];
    // files?: Express.Multer.File[];
}
