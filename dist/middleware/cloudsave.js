"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
function uploadToCloudinary(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Handle single file upload
            if (req.file) {
                yield cloudinary_1.default.uploader.upload(req.file.path, function (error, result) {
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
                const cloudinaryUrls = [];
                for (const file of req.files) {
                    yield cloudinary_1.default.uploader.upload(file.path, function (error, result) {
                        if (error) {
                            console.error(error);
                            return res.status(500).json({ message: "No Network try again" });
                        }
                        cloudinaryUrls.push(result.secure_url);
                    });
                }
                req.cloudinaryUrls = cloudinaryUrls;
                next();
            }
            else {
                req.cloudinaryUrl = ''; // Set null for single file upload
                console.log("No file to upload");
                next();
            }
        }
        catch (error) {
            console.error("Error uploading files to Cloudinary:", error);
            next(error); // Ensure to call next() in case of error to proceed to the next middleware
        }
    });
}
exports.default = uploadToCloudinary;
