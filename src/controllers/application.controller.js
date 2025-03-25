const { extractSkillsFromResume } = require("../utils/resumeParser"); // Ensure this import is present
const Application = require("../models/application.model");
exports.applyForJob = async (req, res) => {
  try {
      const { jobId } = req.body;
      if (!req.file) {
          return res.status(400).json({ message: "Resume is required" });
      }
      console.log(req.file);   
      const skills = await extractSkillsFromResume(req.file.path);   
      const application = new Application({
          jobId,
          userId: req.user.id,
          resumeUrl: req.file.path,  
          skills: skills
      });
      await application.save();
      res.status(200).json({ message: "Application Successfully Submitted" });
  } catch (error) {
      console.log(error);   
      return res.status(500).json({ message: "An error occurred" });
  }
};
exports.getAllApllications= async(req,res)=>{
    try{
         const applications = await Application.find().populate("jobId userId","title name email");
         res.status(200).json(applications);
    }catch(error){
        return res.status(500).json({message:"An error occured"});
    }
}

exports.filterApplicationsBySkills = async (req, res) => {
  try {
      const { jobId, requiredSkills } = req.body;   
      const applications = await Application.find({ jobId }).populate("userId", "name email");
      const filteredApplications = applications.filter(application => {
          const matchedSkills = application.skills.filter(skill => requiredSkills.includes(skill));
          return matchedSkills.length > 0;  
      });
      res.status(200).json(filteredApplications);
  } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "An error occurred while filtering applications" });
  }
};
exports.updateApplicationStatus = async(req,res)=>{
    try{
     const {applicationId,status}= req.body;
     if(!["reviewed","rejected"]){
        return res.status(400).json({message:"Your Application Status can't be changed as it is already reviewed or rejected"});
     }
     await Application.findByIdAndUpdate(applicationId,{status});
     res.status(200).json({message:`Application successfully ${status}`})
    }catch(error){
        return res.status(500).json({message:"An error is occured"});
    }
}
