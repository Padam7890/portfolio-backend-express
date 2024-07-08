import CustomRequest from "../../config/customRequest";
import { Response } from "express";
import { Client } from "../../models/models";
import asyncHandler from "../../middleware/asyncHandler";



const updateCilent  = asyncHandler( async(req, res)=> {
    try {
        const {id} = req.params;
        const {name,url} = req.body;
        const photo = req.cloudinaryUrl;
        const update:{[key:string]:any} = {};

        if(name) update.name = name;
        if(photo) update.image = photo;
        if(url) update.url = url;
        const client = Client.findByIdAndUpdate(id,update,{new:true});
        if(!client){
            return res.status(404).json({msg:"client not found"});
        }
        return res.status(200).json({
            msg:"client updated successfully",
            data:client
        });

        
    } catch (error:any) {
        return res.status(500).json({
            msg:"server error",
            error:error
        });
    }
})

export default updateCilent;