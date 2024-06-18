const { EducationExperience } = require("../../models/models");

const updateResume = (req,res)=>{
    try {
        const { id } = req.params;
        const { title, dateFrom, dateTo, type } = req.body;
        const dateFromConvert = dateTo ? new Date(dateTo).toISOString() : null;
        const dateToConvert = dateFrom ? new Date(dateFrom).toISOString() : null;

        const update = {};
        if (title) update.title = title;
        if (dateFromConvert) update.dateFrom = dateFromConvert;
        if (dateToConvert) update.dateTo = dateToConvert;
        if (type) update.type = type;
        
        const resume = EducationExperience.findByIdAndUpdate(id, update, { new: true });
        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }
        res.status(200).json({ 
            message: "Resume updated successfully",
            data: resume
         });
    
        
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error
        });
        
    }
}

module.exports = updateResume;