const { EducationExperience } = require("../../models/models")

const getResume = async(req,res)=>{
    try {
        const allResume = await EducationExperience.find() ;
        res.status(200).json({
            msg: "resume found",
            data: allResume,
        })

    } catch (error) {
        res.status(500).json({
            msg: "Something went wrong",
        })
        
        
    }


}

module.exports = getResume;