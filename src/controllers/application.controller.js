const Application= require("../models/application.model");
// Apply for a job
exports.applyForJob= async(req,res)=>{
    try{
      const{jobId}= req.body;
      if(!req.file){
        return res.staus(400).json({message:"Reusme is required"});
      }
      const application= new Application({
        jobId,
        userId:req.user.id,
        resumeUrl:req.file.path
      })
      await application.save();
      res.status(200).json({message:"Applciation Successfully Submiited"})
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"An error occured"});
    }
}


// Get All Applications for a job (admin)

exports.getAllApllications= async(req,res)=>{
    try{
         const applications = await Application.find().populate("jobId userId","title name email");
         res.status(200).json(applications);
    }catch(error){
        return res.status(500).json({message:"An error occured"});
    }
}

// Update Application Status (Only Admin);

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
