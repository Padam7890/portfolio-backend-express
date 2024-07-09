import {Request, Response } from "express";
import { Client } from "../../models/models";
import asyncHandler from "../../middleware/asyncHandler";
import CustomRequest from '../../config/customRequest';

// interface CustomRequest extends Request {
//     cloudinaryUrl?: string; // Define cloudinaryUrl as an optional string property
// }
const storeClients = asyncHandler(async (req, res)=>{
    try {
        const { name, url } = req.body;
        const image = req.cloudinaryUrl;
        
        const client = new Client({
            name,
            image,
            url,
        });
        
        await client.save();
        
        res.status(201).json({
            status: "Successfully Client Created",
            data: {
                client,
            },
        });
    } catch (err: any) {
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
})

export default storeClients;
