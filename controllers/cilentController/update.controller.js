const { Client } = require("../../models/models");

const updateCilent  = async(req,res)=> {
    try {
        const {id} = req.params;
        const {name,descriptions} = req.body;
        const photo = req.cloudinaryUrl;
        const update = {};
        if(name) update.name = name;
        if(descriptions) update.descriptions = descriptions;
        if(photo) update.photo = photo;
        const client = Client.findByIdAndUpdate(id,update,{new:true});
        if(!client){
            return res.status(404).json({msg:"client not found"});
        }
        return res.status(200).json({
            msg:"client updated successfully",
            data:client
        });

        
    } catch (error) {
        return res.status(500).json({
            msg:"server error",
            error:error
        });
    }
}

module.exports = updateCilent;