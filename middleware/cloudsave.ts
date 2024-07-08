import cloudinary from "../utils/cloudinary";
import asyncHandler from "./asyncHandler";


const uploadToCloudinary = asyncHandler(async (req, res, next)=> {
    const files= req.files as Express.Multer.File[];
    try {
        // Handle single file upload
        if (req.file) {
            await cloudinary.uploader.upload(req.file.path, function (error: any, result: any) {
                if (error) {
                    return res.status(500).json({ message: "No Network Try Again" });
                }
                req.cloudinaryUrl = result.secure_url;
                console.log(req.cloudinaryUrl);
                next();
            });
        }


        // Handle multiple file uploads
        else if (req.files) {
            const cloudinaryUrls: string[] = [];
            for (const file of files) {
                await cloudinary.uploader.upload(file.path, function (error: any, result: any) {
                    if (error) {
                        console.error(error);
                        return res.status(500).json({ message: "No Network try again" });
                    }
                    cloudinaryUrls.push(result.secure_url);
                });
            }
            req.cloudinaryUrls = cloudinaryUrls;
            next();
        } else {
            req.cloudinaryUrl = ''; // Set null for single file upload
            console.log("No file to upload");
            next();
        }
    } catch (error) {
        console.error("Error uploading files to Cloudinary:", error);
        next(error); // Ensure to call next() in case of error to proceed to the next middleware
    }
})

export default uploadToCloudinary;
