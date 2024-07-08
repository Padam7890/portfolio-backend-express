import { EducationExperience } from "../../models/models";
import asyncHandler from "../../middleware/asyncHandler";


const getResume = asyncHandler (async (req, res)=> {
    try {
        const allResume = await EducationExperience.find() ;
        return res.status(200).json({
            msg: "resume found",
            data: allResume,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Something went wrong",
        })
        }


});

export default getResume;