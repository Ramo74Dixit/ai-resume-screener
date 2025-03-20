// User Posting Job 

const Job = require("../models/job.model");

exports.postJob = async(req,res)=>{
    try{
        const {title,description,company,location}= req.body;
        const job= new Job({
            title,
            description,
            company,
            location,
            createdBy:req.user.id
        })
        await job.save();
        return res.status(200).json({message:"Job is Posted Successfully"});
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Bhaiya ji error aa gyi hai "})
    }
}

exports.reviewJob= async(req,res)=>{
    try{
        const {jobId,status}=req.body;
        if(!["approved","rejected"]){
            return res.status(400).json({message:"Your Status is Invalid Kindly Try again After some time"});
        }
        await Job.findByIdAndUpdate(jobId,{status});
        res.status(200).json({message:`Job ${status} successfully`});
    }catch(err){
        return res.status(500).json({message:"An error occured during review the job"});
    }
}









exports.getJobs=async (req,res)=>{
    try{
         const jobs = await Job.find({status:"approved"});
         res.status(200).json(jobs);
    }catch(err){
        return res.status(500).json({message:"Job Fetch krne me errror aa gyi hai "})
    }
}