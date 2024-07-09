import asyncHandler from "../../middleware/asyncHandler";
import { SkillsPercentage } from "../../models/models";


const getSkillPercentage = asyncHandler(async(req,res)=>{
     try {
         const skillPercentage = await SkillsPercentage.find();
         return res.status(200).json({
             msg: "skill percentage found",
             data: skillPercentage,
         })
        
     } catch (error) {
         return res.status(500).json({
             msg: "Something went wrong",
         })
         }
})

export default getSkillPercentage;